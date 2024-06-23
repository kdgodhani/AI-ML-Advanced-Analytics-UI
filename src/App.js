import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Error, Register, ProtectedRoute, Home } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SharedLayout,
  Product,
  // ReoortDashboard,
  // Analytics,
  // UrlGenerate
} from "./pages/dashboard";
// import CryptoJS from 'crypto-js';

function App() {
  // useEffect(() => {
  //   // Disable keyboard shortcuts
  //   const disableKeyboardShortcuts = (e) => {
  //     if (
  //       (e.ctrlKey && e.key === 'c') || // Ctrl+C
  //       (e.ctrlKey && e.key === 'a') || // Ctrl+A
  //       (e.ctrlKey && e.key === 's') || // Ctrl+S
  //       (e.ctrlKey && e.key === 'p')    // Ctrl+P
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
  //       alert('Extensions are not allowed');
  //     }
  //   };

  //   document.addEventListener('keydown', disableKeyboardShortcuts);
  //   document.addEventListener('contextmenu', disableContextMenu);
  //   document.addEventListener('dragstart', disableDragAndDrop);
  //   document.addEventListener('drop', disableDragAndDrop);

  //   checkForExtensions();
  //   const intervalId = setInterval(checkForExtensions, 1000);

  //   return () => {
  //     document.removeEventListener('keydown', disableKeyboardShortcuts);
  //     document.removeEventListener('contextmenu', disableContextMenu);
  //     document.removeEventListener('dragstart', disableDragAndDrop);
  //     document.removeEventListener('drop', disableDragAndDrop);
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // const sendData = (data) => {
  //   const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret-key').toString();
  //   // Send encryptedData via WebSocket or any other secure channel
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="admin-dashboard" element={<Home />} />
          {/* <Route path="report-dashboard" element={<ReportDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="url-generate" element={<UrlGenerate />} /> */}
        </Route>

        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="product" element={<Product />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
