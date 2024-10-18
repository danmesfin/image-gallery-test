import uuid
import boto3
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Image, db, User
from config import Config
from supabase import create_client, Client
from config import Config

supabase: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)


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