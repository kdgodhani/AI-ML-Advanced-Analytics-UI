import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  setCartItemsFromLocalStorage,
} from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../../features/product/productSlice";
import { loadCartItems } from "../../utils/localStorage";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Calculate total amount
  const totalAmount = products.reduce((total, item) => {
    const cartItem = cartItems.find((ci) => ci.id === item._id);
    return total + item.price * (cartItem?.quantity ?? 0);
  }, 0);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    loadCartItems(dispatch, setCartItemsFromLocalStorage);
  }, [dispatch]);

  // Fetch product details based on cart items
  useEffect(() => {
    const fetchProducts = async () => {
      if (cartItems.length === 0) {
        setProducts([]);
        return;
      }

      try {
        const productIds = cartItems.map((obj) => obj.id);
        const productDataPromises = productIds.map((productId) =>
          dispatch(getProductById(productId))
        );
        const responses = await Promise.all(productDataPromises);
        const productData = responses.map(
          (response) => response.payload.data[0]
        );

        console.log(productData, "this is product data - 46");
        setProducts(productData);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, [cartItems, dispatch]);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item Removed from Cart", {
      position: "top-center",
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error("All Items Removed", {
      position: "top-center",
    });
  };

  const handleCheckout = () => {
    navigate("/payment/checkout");
  };

  return (
    <Wrapper>
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {products.map((item) => {
              const cartItem = cartItems.find(
                (cartItem) => cartItem.id === item._id
              );
              return (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-image-container">
                    <img
                      src={item.image} // Adjusted to use 'image' instead of 'Image'
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="cart-item-details">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <div className="cart-item-row">
                      <div className="cart-item-quantity">
                        <button onClick={() => handleDecrement(item._id)}>
                          -
                        </button>
                        <span>{cartItem?.quantity ?? 0}</span>
                        <button onClick={() => handleIncrement(item._id)}>
                          +
                        </button>
                      </div>
                      <p className="cart-item-price">
                        ₹ {item.price * (cartItem?.quantity ?? 0)}
                      </p>
                      <div className="remove-btn-container">
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="remove-button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="cart-summary">
              <div className="cart-total-wrap">
                <p className="cart-total">Total Amount: ₹ {totalAmount}</p>
              </div>
              <button onClick={handleClearCart} className="clear-cart-button">
                Clear Cart
              </button>
              <button onClick={handleCheckout} className="checkout-button">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .cart-page {
    padding: 20px;
    background-color: #f9f9f9;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .cart-item {
    display: flex;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .cart-item-image-container {
    width: 100px;
  }

  .cart-item-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-right: 20px;
  }

  .cart-item-details {
    flex: 1;
    margin: 0 10px;
  }

  .cart-item-details h2 {
    margin: 0 0 10px;
  }

  .cart-item-details p {
    margin: 5px 0;
  }

  .cart-item-row {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cart-item-quantity {
    display: flex;
    align-items: center;
  }

  .cart-item-quantity button {
    padding: 5px 10px;
    margin: 0 15px;
    border-radius: 50%;
  }

  .cart-item-price {
    margin-left: 20px;
    font-weight: bold;
  }

  .remove-btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remove-button {
    padding: 5px 10px;
    margin-left: 20px;
    background-color: #ff4d4d;
    /* Example color */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .remove-button:hover {
    background-color: #ff1a1a;
    /* Darker shade for hover effect */
  }

  .cart-summary {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
  }

  .clear-cart-button,
  .checkout-button {
    padding: 10px 20px;
    margin: 5px 0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  .clear-cart-button {
    background-color: #ff4d4d;
    /* Example color */
    color: white;
  }

  .clear-cart-button:hover {
    background-color: #ff1a1a;
    /* Darker shade for hover effect */
  }

  .checkout-button {
    background-color: #59cc5d;
    /* Example color */
    color: white;
  }

  .checkout-button:hover {
    background-color: #009908;
    /* Darker shade for hover effect */
  }

  .cart-total-wrap {
    background-color: #4caf50;
    padding: 0 15px;
    border-radius: 5px;
  }

  .cart-total {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;


export default Cart;
