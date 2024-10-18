from flask import Flask
from models import db
from flask_jwt_extended import JWTManager
from auth import auth_bp
from image import image_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(image_bp, url_prefix='/image')

if __name__ == '__main__':
    app.run(debug=True)
