import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import './productDetails.css';
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  //   createOrder,
} from "../../features/product/productSlice";
// import {
//   addToCart,
//   //   setCartItemsFromLocalStorage,
// } from "../../redux/slice/cartSlice";
// import { localStorage } from "../../utils";
import { toast } from "react-toastify";

const ProductPage = () => {
  const dispatch = useDispatch();

  let productList = [];
  let isLoading = false;
  //   const { productList, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    // Load cart items from localStorage
    // localStorage(dispatch, setCartItemsFromLocalStorage);

    // Fetch products
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    // dispatch(addToCart(productId));
    toast.success("Added to Cart", {
      position: "top-center",
    });
  };

  const handleCreateOrder = (productId) => {
    // dispatch(createOrder(productId));
    console.log(productId, "productId");
  };

  return (
    <Wrapper>
      <div className="product-page">
        <h1>Our Products</h1>
        {isLoading && <p>Loading...</p>}
        {productList.length === 0 ? (
          <div className="notfound">
            <p>No Products found</p>
          </div>
        ) : (
          <div className="product-grid">
            {productList.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.Image}
                  alt={product.name}
                  className="product-image"
                />
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <p className="product-price">₹ {product.price}</p>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to cart
                  </button>
                  <button
                    className="order-button"
                    onClick={() => handleCreateOrder(product._id)}
                  >
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .product-page {
    text-align: center;
    padding: 40px;
    background-color: #f9f9f9;
  }

  .product-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .product-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: left;
    transition: transform 0.2s;
  }

  .product-card:hover {
    transform: translateY(-5px);
  }

  .product-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .product-name {
    font-size: 1.5em;
    margin: 10px 0;
    color: #333;
  }

  .product-description {
    font-size: 1em;
    margin: 10px 0;
    color: #666;
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .product-price {
    font-size: 1.2em;
    color: #007bff;
    font-weight: bold;
  }

  .add-to-cart-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .add-to-cart-button:hover {
    background-color: #0056b3;
  }

  .notfound {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .notfound p {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: red;
  }
`;

export default ProductPage;
