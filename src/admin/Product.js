import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Product.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
    brand: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  // Handle product form submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.brand) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    if (isNaN(newProduct.price) || isNaN(newProduct.quantity) || newProduct.price <= 0 || newProduct.quantity <= 0) {
      alert("Giá và số lượng phải là số hợp lệ và lớn hơn 0.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/products/${currentProductId}`, newProduct);
        setProducts((prev) =>
          prev.map((prod) => (prod.id === currentProductId ? { ...prod, ...newProduct } : prod))
        );
      } else {
        const response = await axios.post("http://localhost:5000/api/products", newProduct);
        setProducts((prev) => [...prev, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Error processing product:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  // Reset form after submission
  const resetForm = () => {
    setNewProduct({
      name: "",
      price: "",
      quantity: "",
      image: "",
      brand: "",
    });
    setIsEditing(false);
    setCurrentProductId(null);
  };

  // Edit Product
  const editProduct = (product) => {
    setNewProduct(product);
    setIsEditing(true);
    setCurrentProductId(product.id);
  };

  // Delete Product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts((prev) => prev.filter((prod) => prod.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div>
      <h1>Product Management</h1>

      <div className="add-product-form">
        <h2>{isEditing ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleProductSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
          />
          <select name="brand" value={newProduct.brand} onChange={handleInputChange}>
            <option value="">Select Brand</option>
            <option value="Dell">Dell</option>
            <option value="Asus">Asus</option>
            <option value="HP">HP</option>
            <option value="Lenovo">Lenovo</option>
          </select>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {newProduct.image && <img src={newProduct.image} alt="Preview" />}
          <button type="submit">{isEditing ? "Update Product" : "Add Product"}</button>
          {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
        </form>
      </div>

      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Brand</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.brand}</td>
              <td>
                {product.image ? <img src={product.image} alt={product.name} width="50" /> : "No image"}
              </td>
              <td>
                <FontAwesomeIcon icon={faEdit} onClick={() => editProduct(product)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteProduct(product.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
