import React, { useEffect, useState } from 'react';
import './productDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createOrder } from './productSlice';
import { addToCart, setCartItemsFromLocalStorage } from '../../redux/slice/cartSlice';
import { loadCartItems } from '../../utils/cartutils';
import { toast } from 'react-toastify';

const ProductPage = () => {
    const dispatch = useDispatch();
    const { productList, loading, error } = useSelector((state) => state.products);
    
    useEffect(() => {
        // Load cart items from localStorage
        loadCartItems(dispatch, setCartItemsFromLocalStorage);

        // Fetch products
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId));
        toast.success('Added to Cart', {
            position: 'top-center'
        });
    };

    const handleCreateOrder = (productId) => {
        dispatch(createOrder(productId));
    };

    return (
        <div className="product-page">
            <h1>Our Products</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {productList.length === 0 ? (
                <div className="notfound">
                    <p>No Products found</p>
                </div>
            ) : (
                <div className="product-grid">
                    {productList.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={product.Image} alt={product.name} className="product-image" />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                            <div className="product-footer">
                                <p className="product-price">₹ {product.price}</p>
                                <button className="add-to-cart-button" onClick={() => handleAddToCart(product._id)}>Add to cart</button>
                                <button className="order-button" onClick={() => handleCreateOrder(product._id)}>Order</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductPage;
