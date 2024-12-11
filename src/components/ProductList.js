// ProductList Component
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ products, addToCart }) => {
    const formatPrice = (price) => {
        if (price !== null && price !== undefined) {
            return price.toLocaleString();
        }
        return 'N/A';
    };

    return (
        <div className="product-list">
            {products.map((product) => {
                const validPrice = product.price ?? 0;

                const handleAddToCart = () => {
                    addToCart(product);
                    alert(`${product.name} đã được thêm vào giỏ hàng!`);
                };

                return (
                    <div key={product.id} className="product-item">
                        {/* Product Image */}
                        <div className="product-image-container">
                            <img
                                className="product-image"
                                src={product.image || '/default-image.jpg'} // Default image if no product image
                                alt={product.name}
                            />
                        </div>

                        {/* Product Name with link to product details */}
                        <Link to={`/product/${product.id}`} className="product-name">
                            {product.name}
                        </Link>

                        {/* Product Price */}
                        <div className="product-price-info">
                            <p className="original-price">
                                {formatPrice(validPrice)} VND
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="card-buttons">
                            <button className="order-btn" onClick={handleAddToCart}>
                                Thêm vào giỏ
                            </button>
                            {/* Link to the Product Details page */}
                            <Link to={`/product/${product.id}`} className="details-btn">
                                Xem chi tiết
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
