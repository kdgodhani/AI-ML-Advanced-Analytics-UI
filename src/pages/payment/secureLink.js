import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Wrapper from "../../assets/wrappers/PaymentPages";
import { verifySecurePaymentLink } from "../../features/common/commonSlice";
// import { clearCart } from "../../features/cart/cartSlice";

const SecureLink = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePayment = async () => {
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        console.error("Token not found in URL");
        return;
      }

      try {
        const res = await dispatch(verifySecurePaymentLink(token)).unwrap();
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
  }, [dispatch]);

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
    </Wrapper>
  );
};

export default SecureLink;
