import uuid
import boto3
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.src.models import Image, db
from server.src.config import Config
from supabase import create_client, Client
import requests
from openai import OpenAI
import uuid
import os
from urllib.parse import quote, unquote

supabase: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)

client = OpenAI(
    api_key=Config.OPENAI_API_KEY
)

image_bp = Blueprint('image', __name__)

image_bp = Blueprint('image', __name__)
s3 = boto3.client(
    's3',
    aws_access_key_id=Config.S3_KEY,
    aws_secret_access_key=Config.S3_SECRET
)

@image_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_image():
    if not Config.S3_BUCKET:
        return jsonify(message="S3 bucket not configured"), 500

    user_id = get_jwt_identity()
    if 'file' not in request.files:
        return jsonify(message="No file part"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(message="No selected file"), 400
    if file:
        filename = str(uuid.uuid4()) + '_' + file.filename
        s3.upload_fileobj(file, Config.S3_BUCKET, filename)
        image = Image(filename=filename, user_id=user_id)
        db.session.add(image)
        db.session.commit()
        return jsonify(message="Image uploaded successfully", filename=filename), 200

@image_bp.route('/images', methods=['GET'])
@jwt_required()
def get_images():
    user_id = get_jwt_identity()
    images = Image.query.filter_by(user_id=user_id).all()
    image_data = [{
        'id': img.id,
        'filename': img.filename,
        'url': img.url,
        'upload_date': img.upload_time.isoformat()
    } for img in images]
    return jsonify(images=image_data, count=len(image_data)), 200

@image_bp.route('/upload-supabase', methods=['POST'])
@jwt_required()
def upload_image_supabase():
    user_id = get_jwt_identity()
    if 'file' not in request.files:
        return jsonify(message="No file part"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(message="No selected file"), 400
    if file:
        filename = str(uuid.uuid4()) + '_' + file.filename
        file_content = file.read()
        
        # Upload to Supabase Storage
        result = supabase.storage.from_(Config.SUPABASE_BUCKET).upload(filename, file_content)
        
        if result:
            # Get the public URL of the uploaded file
            file_url = supabase.storage.from_(Config.SUPABASE_BUCKET).get_public_url(filename)
            
            # Save image info to database
            image = Image(filename=filename, user_id=user_id, url=file_url)
            db.session.add(image)
            db.session.commit()
            
            return jsonify(message="Image uploaded successfully", filename=filename, url=file_url), 200
        else:
            return jsonify(message="Upload to Supabase failed"), 500

@image_bp.route('/analyze', methods=['POST'])
@jwt_required()
def analyze_image():
    user_id = get_jwt_identity()
    
    if 'file' in request.files:
        file = request.files['file']
        if file.filename == '':
            return jsonify(message="No selected file"), 400
        
        # Replace spaces and special characters in the filename
        base_name = os.path.splitext(file.filename)[0]
        file_extension = os.path.splitext(file.filename)[1]
        sanitized_base_name = ''.join(c if c.isalnum() else '-' for c in base_name)
        filename = f"{uuid.uuid4()}_{sanitized_base_name}{file_extension}"
        
        file_content = file.read()
        
        # Upload to Supabase Storage
        result = supabase.storage.from_(Config.SUPABASE_BUCKET).upload(filename, file_content)
        
        if result:
            file_url = supabase.storage.from_(Config.SUPABASE_BUCKET).get_public_url(filename)
            
            # Save image info to database
            image = Image(filename=filename, user_id=user_id, url=file_url)
            db.session.add(image)
            db.session.commit()
        else:
            return jsonify(message="Upload to Supabase failed"), 500
    
    elif 'image_url' in request.form:
        file_url = request.form['image_url']
    
    else:
        return jsonify(message="No file or URL provided"), 400

    # Use the original URL without additional encoding
    analysis = analyze_image_with_openai(file_url)
    
    return jsonify(analysis=analysis), 200
def analyze_image_with_openai(image_url):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What's in this image?"},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"{image_url}"}
                    },
                ],
            }
        ],
    )
    return response.choices[0].message.content

@image_bp.route('/analyze/<int:image_id>', methods=['GET'])
@jwt_required()
def get_image_analysis(image_id):
    image = Image.query.get_or_404(image_id)
    analysis = analyze_image_with_openai(image.url)
    return jsonify(analysis=analysis), 200