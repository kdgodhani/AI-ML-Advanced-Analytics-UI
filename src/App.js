import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Landing, Error, Register, ProtectedRoute, Home } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SharedLayout,
  Product,
  ReportDashboard,
  PredictiveAnalytics,
  UrlGenerate,
  Cart,
  ChartReport,
} from "./pages/dashboard";

import { CheckoutPage, Failed, SecureLink, Success } from "./pages/payment";

const MainLayout = () => {
  // const location = useLocation();
  // const showNavbar = ["/landing", "/register", "/product"].includes(
  //   location.pathname
  // );

  return (
    <>
      {/* {showNavbar && <Navbar />} */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute roles={["Admin", "Customer"]}>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route
            path="report-dashboard"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <ReportDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="chart-report"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <ChartReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <PredictiveAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="url-generate"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <UrlGenerate />
              </ProtectedRoute>
            }
          />

          <Route
            path="product"
            element={
              <ProtectedRoute roles={["Admin", "Customer"]}>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectedRoute roles={["Admin", "Customer"]}>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />

        <Route path="payment/checkout" element={<CheckoutPage />} />
        <Route path="payment/securelink" element={<SecureLink />} />
        <Route path="payment/success" element={<Success />} />
        <Route path="payment/failed" element={<Failed />} />
        {/* <Route path="product" element={<Product />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
};

function App() {
  // useEffect(() => {
  //   // Disable keyboard shortcuts
  //   const disableKeyboardShortcuts = (e) => {
  //     if (
  //       (e.ctrlKey && e.key === "c") || // Ctrl+C
  //       (e.ctrlKey && e.key === "a") || // Ctrl+A
  //       (e.ctrlKey && e.key === "s") || // Ctrl+S
  //       (e.ctrlKey && e.key === "p") // Ctrl+P
  //     ) {
  //       e.preventDefault();
  //     }
  //   };

  //   // Disable right-click context menu
  //   const disableContextMenu = (e) => {
  //     e.preventDefault();
  //   };

  //   // Disable drag and drop
  //   const disableDragAndDrop = (e) => {
  //     e.preventDefault();
  //   };

  //   // Attempt to detect and handle browser extensions // stop scarping using extention
  //   const checkForExtensions = () => {
  //     if (window.chrome && window.chrome.runtime && window.chrome.runtime.id) {
  //       alert("Extensions are not allowed");
  //     }
  //   };

  //   document.addEventListener("keydown", disableKeyboardShortcuts);
  //   document.addEventListener("contextmenu", disableContextMenu);
  //   document.addEventListener("dragstart", disableDragAndDrop);
  //   document.addEventListener("drop", disableDragAndDrop);

  //   checkForExtensions();
  //   const intervalId = setInterval(checkForExtensions, 1000);

  //   return () => {
  //     document.removeEventListener("keydown", disableKeyboardShortcuts);
  //     document.removeEventListener("contextmenu", disableContextMenu);
  //     document.removeEventListener("dragstart", disableDragAndDrop);
  //     document.removeEventListener("drop", disableDragAndDrop);
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // // const sendData = (data) => {
  // //   const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret-key').toString();
  // //   // Send encryptedData via WebSocket or any other secure channel
  // // };

  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

// function App() {
//   return (
//     <BrowserRouter>
//       <MainLayout />
//     </BrowserRouter>
//   );
// }

export default App;
