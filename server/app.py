from flask import Flask
from models import db
from flask_jwt_extended import JWTManager
from auth import auth_bp
from image import image_bp
from config import Config
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/*": {"origins": "https://image-gallery-dan.vercel.app"}})
migrate = Migrate(app, db)


db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(image_bp, url_prefix='/image')

with app.app_context():
    db.create_all()
    
if __name__ == '__main__':
    app.run(debug=False)

from flask import jsonify
from models import User

@app.route('/test-db')
def test_db():
    try:
        users = User.query.all()
        return jsonify({"message": "Database connection successful", "user_count": len(users)}), 200
    except Exception as e:
        return jsonify({"message": "Database connection failed", "error": str(e)}), 500
