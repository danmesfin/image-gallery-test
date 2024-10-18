import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://user:password@localhost:5432/mydatabase')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    S3_BUCKET = os.getenv('S3_BUCKET')
    S3_KEY = os.getenv('S3_KEY')
    S3_SECRET = os.getenv('S3_SECRET')
    S3_LOCATION = f'http://{S3_BUCKET}.s3.amazonaws.com/'
