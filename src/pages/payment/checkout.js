import React, { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/PaymentPages";
// import { PaymentCheckout } from "../../Services/Payment/checkout";
// import { useDispatch } from 'react-redux';
// import { clearCart } from '../../Slice/cartSlice';

const CheckoutPage = () => {
  // const [checkoutItems, setCheckoutItems] = useState([]);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem("cartItems"));
  //   if (items) {
  //     setCheckoutItems(items);
  //   }
  // }, []);

  // useEffect(() => {
  //   const handlePayment = async () => {
  //     try {
  //       if (checkoutItems.length > 0) {
  //         const res = await PaymentCheckout(checkoutItems);
  //         if (res) {
  //           window.location.href = res.response.url;
  //         } else {
  //           console.error("Payment URL not found in response");
  //         }
  //       }
  //       // handleClearCart();
  //     } catch (error) {
  //       console.error("There was an error fetching the products!", error);
  //     }
  //   };

  //   handlePayment();
  // }, [checkoutItems]);

  return (
    <Wrapper>
      <div style={{ textAlign: "center" }}>
        <h2>Proceeding for Payment...</h2>
      </div>
    </Wrapper>
  );
};

export default CheckoutPage;
