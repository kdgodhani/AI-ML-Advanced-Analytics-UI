import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Wrapper from "../../assets/wrappers/PaymentPages";
import { paymentCheckout } from "../../features/common/commonSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { clearCart } from "../../features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems"));
    if (items) {
      setCheckoutItems(items);
    }
  }, []);

  useEffect(() => {
    const handlePayment = async () => {
      if (checkoutItems.length === 0) {
        // toast.error("No items in the cart");
        return;
      }

      const productsData = checkoutItems.map((item) => ({
        product_id: item.id,
        product_quantity: item.quantity,
      }));

      try {
        const res = await dispatch(paymentCheckout({ productsData })).unwrap();
        if (res.success && res.data.url) {
          window.location.href = res.data.url;
        } else {
          setShowModal(true);
        }
      } catch (error) {
        console.error(
          "There was an error fetching the payment details!",
          error
        );
        setShowModal(true);
      }
    };

    handlePayment();
  }, [checkoutItems, dispatch]);

  return (
    <Wrapper>
      <div style={{ textAlign: "center" }}>
        <h2>Proceeding for Payment...</h2>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Payment Error"
      >
        <h2>Payment Error</h2>
        <p>
          We are currently unable to process this order. Please try again later.
        </p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </Modal>
      <ToastContainer />
    </Wrapper>
  );
};

export default CheckoutPage;
