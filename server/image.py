import boto3
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Image, db, User
from config import Config

image_bp = Blueprint('image', __name__)
s3 = boto3.client(
    's3',
    aws_access_key_id=Config.S3_KEY,
    aws_secret_access_key=Config.S3_SECRET
)

@image_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_image():
    user_id = get_jwt_identity()
    file = request.files['file']
    s3.upload_fileobj(file, Config.S3_BUCKET, file.filename)

    image = Image(filename=file.filename, user_id=user_id)
    db.session.add(image)
    db.session.commit()

    return jsonify(message="Image uploaded successfully"), 200

@image_bp.route('/images', methods=['GET'])
@jwt_required()
def get_images():
    user_id = get_jwt_identity()
    images = Image.query.filter_by(user_id=user_id).all()
    image_urls = [Config.S3_LOCATION + img.filename for img in images]
    return jsonify(images=image_urls), 200
