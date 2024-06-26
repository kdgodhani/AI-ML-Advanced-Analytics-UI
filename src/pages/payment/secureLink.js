import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/PaymentPages";

const SecureLink = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <div className="payment-failure-page">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Payment Failure"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Payment Failed</h2>
          <p>There was an issue processing your payment. Please try again.</p>
          <button onClick={closeModal}>Okay</button>
        </Modal>
      </div>
    </Wrapper>
  );
};

export default SecureLink;
