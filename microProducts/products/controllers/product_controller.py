from flask import Blueprint, request, jsonify
from products.models.product_model import Products
from db.db import db

product_controller = Blueprint('product_controller', __name__)

@product_controller.route('/api/products', methods=['GET'])
def get_products():
    print("listado de productos")
    products = Products.query.all()
    result = [{'id':product.id, 'name': product.name, 'description': product.description, 'price': product.price} for product in products]
    return jsonify(result)

# Get single product by id
@product_controller.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    print("obteniendo producto")
    product = Products.query.get_or_404(product_id)
    return jsonify({'id':product.id, 'name': product.name, 'description': product.description, 'price': product.price})

@product_controller.route('/api/products', methods=['POST'])
def create_user():
    print("creando producto")
    data = request.json
    new_product = Products(name=data['name'], description=data['description'], price=data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully'}), 201

# Update an existing product
@product_controller.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    print("actualizando producto")
    product = Products.query.get_or_404(product_id)
    data = request.json
    product.name = data['name']
    product.description = data['description']
    product.price = data['price']
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'})

# Delete an existing product
@product_controller.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Products.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})
