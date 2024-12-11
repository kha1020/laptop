import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams(); // Lấy productId từ URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
                setProduct(response.data);  // Lưu thông tin sản phẩm vào state
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            }
        }
        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <div>Đang tải thông tin sản phẩm...</div>;
    }

    return (
        <div className="product-detail">
            <div className="product-image-container">
                <img
                    className="product-image"
                    src={product.image || '/default-image.jpg'} // Default image if no product image
                    alt={product.name}
                />
            </div>

            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="product-price-info">
                <p className="price">{product.price.toLocaleString()} VND</p>
            </div>
            <button className="add-to-cart-btn">
                Thêm vào giỏ hàng
            </button>
        </div>
    );
};

export default ProductDetail;
