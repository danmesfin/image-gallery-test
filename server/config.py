import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres.nbcfuikvxharpunkgloz:oyPVPyhIejrhW89W@aws-0-eu-central-1.pooler.supabase.com:6543/postgres')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    S3_BUCKET = os.getenv('S3_BUCKET')
    S3_KEY = os.getenv('S3_KEY', "943407f5e26ac0fd49c755fbfadbe5ae")
    S3_SECRET = os.getenv('S3_SECRET', "aab86b527622a57f71b3bf96aa8cb9736a1f045caed9cffa7c5a1a7ff7920d67")
    S3_LOCATION = 'https://nbcfuikvxharpunkgloz.supabase.co/storage/v1/s3' #f'http://{S3_BUCKET}.s3.amazonaws.com/'
    SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://nbcfuikvxharpunkgloz.supabase.co')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iY2Z1aWt2eGhhcnB1bmtnbG96Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTI0NzgwNSwiZXhwIjoyMDQ0ODIzODA1fQ.gsZC-uwZIqpWh8LvhiF-Y6HrzEYDNoMkZv8Gm-Em4EM')
    SUPABASE_BUCKET = os.getenv('SUPABASE_BUCKET', 'image-gallery')