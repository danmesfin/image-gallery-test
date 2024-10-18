import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres.nbcfuikvxharpunkgloz:oyPVPyhIejrhW89W@aws-0-eu-central-1.pooler.supabase.com:6543/postgres')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    S3_BUCKET = os.getenv('S3_BUCKET')
    S3_KEY = os.getenv('S3_KEY')
    S3_SECRET = os.getenv('S3_SECRET',)
    S3_LOCATION = os.getenv('S3_LOCATION') #f'http://{S3_BUCKET}.s3.amazonaws.com/'
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
    SUPABASE_BUCKET = os.getenv('SUPABASE_BUCKET')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
