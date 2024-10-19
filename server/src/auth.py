from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from server.src.models import User, db
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = generate_password_hash(data['password'])

    try:
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify(message="User registered successfully"), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify(message="Username already exists"), 409
    
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, message="Login successful"), 200
    
    return jsonify(message="Invalid credentials"), 401

