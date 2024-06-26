import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/PaymentPages";
import { useDispatch } from "react-redux";
import { txnStatusUpdate } from "../../features/common/commonSlice"; // Import the thunk

const Failed = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const updateTxnStatus = async () => {
      const orderId = new URLSearchParams(window.location.search).get(
        "orderId"
      );
      await dispatch(txnStatusUpdate({ orderId, isSuccess: false }));
      setTimeout(() => {
        closeModal();
      }, 3000);
    };

    updateTxnStatus();
  }, [dispatch]);

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

export default Failed;
