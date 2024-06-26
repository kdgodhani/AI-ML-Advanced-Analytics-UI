import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/PaymentPages";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import { getProductById } from "../../features/product/productSlice";
import { txnStatusUpdate } from "../../features/common/commonSlice"; // Import the thunk

const Success = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [productDetails, setProductDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const orderGeneratedRef = useRef(false);

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
  };

  useEffect(() => {
    const updateTxnStatus = async () => {
      const orderId = new URLSearchParams(window.location.search).get(
        "orderId"
      );
      await dispatch(txnStatusUpdate({ orderId, isSuccess: true }));
      handleClearCart();
      setTimeout(() => {
        closeModal();
      }, 3000);
    };

    if (!orderGeneratedRef.current) {
      updateTxnStatus();
      orderGeneratedRef.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productIds = cartItems.map((obj) => obj.id);
        const productDataPromises = productIds.map((productId) =>
          getProductById(productId)
        );
        const responses = await Promise.all(productDataPromises);
        const productData = responses.map((response) => response.response);
        setProductDetails(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchProductDetails();
    }
  }, [cartItems]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = productDetails.reduce((acc, curr) => {
        const cartItem = cartItems.find((ci) => ci.id === curr?._id);
        return acc + curr?.price * (cartItem?.quantity ?? 0);
      }, 0);
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [productDetails, cartItems]);

  return (
    <Wrapper>
      <div className="payment-success-page">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Payment Success"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Payment Successful</h2>
          <p>Your payment was completed successfully!</p>
          <button onClick={closeModal}>Okay</button>
        </Modal>
      </div>
    </Wrapper>
  );
};

export default Success;
