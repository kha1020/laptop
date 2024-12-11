import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        const featured = response.data.filter(product => product.isFeatured);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const isCategoryMatch = selectedCategory ? product.category === selectedCategory : true;
      const isPriceMatch = maxPrice ? product.price <= maxPrice : true;
      const isBrandMatch = selectedBrand ? product.brand === selectedBrand : true;
      return isCategoryMatch && isPriceMatch && isBrandMatch;
    });
  }, [selectedCategory, maxPrice, selectedBrand, products]);

  const addToCart = async (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.id === product.id);

    if (productIndex === -1) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      updatedCart[productIndex].quantity += 1;
    }

    setCart(updatedCart);
    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Add product to cart in the database (via API)
    try {
      await axios.post('http://localhost:5000/api/cart', {
        productId: product.id,
        quantity: 1,
      });
      console.log('Sản phẩm đã được thêm vào giỏ hàng');
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng trong cơ sở dữ liệu:', error);
    }

    // Navigate to the cart page
    navigate('/cart');
  };

  return (
    <div>
      <Header cart={cart} />
      <h1>Chào mừng đến với cửa hàng máy tính</h1>
      <Link to="/cart" className="cart-link">Giỏ hàng ({cart.length})</Link>

      <div className="banner-container">
        <img src="/path-to-banner.jpg" alt="Banner" />
      </div>

      <div className="filter-container">
        <input
          type="number"
          placeholder="Giá tối đa"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Tất cả thương hiệu</option>
          <option value="Apple">Apple</option>
          <option value="Asus">Asus</option>
          <option value="Lenovo">Lenovo</option>
        </select>

        <button
          onClick={() => {
            setSelectedCategory('');
            setMaxPrice('');
            setSelectedBrand('');
          }}
        >
          Xóa lọc
        </button>
      </div>

      <section className="featured-products">
        <h2>Sản phẩm nổi bật</h2>
        <div className="product-list">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.price} VND</p>
              <button onClick={() => addToCart(product)}>Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      </section>

      <div className="product-list">
        <ProductList products={filteredProducts} addToCart={addToCart} />
      </div>
    </div>
  );
};

export default Home;
