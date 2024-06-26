import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { FaCopy } from "react-icons/fa6";

import { useDispatch } from "react-redux";
let {
  getAllPendingOrder,
  generateSecurePaymentLink,
} = require("../../features/common/commonSlice");

const GenerateLink = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  // const apiUrl = 'https://your-api-url/generateUrl';

  useEffect(() => {
    // Replace with your actual fetch logic to get orders data
    const fetchOrders = async () => {
      try {
        // let data = [
        //   {
        //     _id: "667a59200e02e9f7ffd77b33",
        //     user_id: "667a59200e02e9f7ffd77b32",
        //     products: [
        //       {
        //         product_id: "667a59200e02e9f7ffd77afa",
        //         product_quantity: 1,
        //         _id: "667a59200e02e9f7ffd77b34",
        //         name: "Beauty-497268112",
        //         description:
        //           "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        //         price: 15,
        //         category: "Beauty",
        //         seller_name: "Clovis84",
        //         is_dummy: true,
        //       },
        //     ],
        //     total_amount: 15,
        //     order_status: "Pending",
        //     is_dummy: true,
        //     created_at: "2024-06-25T05:44:00.210Z",
        //     updated_at: "2024-06-25T05:44:00.210Z",
        //     __v: 0,
        //   },
        //   {
        //     _id: "667a59260e02e9f7ffd77bc5",
        //     user_id: "667a59260e02e9f7ffd77bc4",
        //     products: [
        //       {
        //         product_id: "667a59260e02e9f7ffd77b74",
        //         product_quantity: 1,
        //         _id: "667a59260e02e9f7ffd77bc6",
        //         name: "Fashion-132502586",
        //         description:
        //           "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
        //         price: 7,
        //         category: "Fashion",
        //         seller_name: "Trudie15",
        //         is_dummy: true,
        //       },
        //     ],
        //     total_amount: 7,
        //     order_status: "Pending",
        //     is_dummy: true,
        //     created_at: "2024-06-25T05:44:06.899Z",
        //     updated_at: "2024-06-25T05:44:06.899Z",
        //     __v: 0,
        //   },
        // ];

        const response = await dispatch(getAllPendingOrder());
        let result = response.payload.data;

        console.log(result, "this is result - 87 - urlgeneratePage");

        setOrders(result);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [dispatch]);

  // Handle generate URL button click
  const handleGenerateUrl = async (orderId) => {
    try {
      const response = await dispatch(generateSecurePaymentLink(orderId));
      let result = response.payload.data;

      console.log(result, "this is result ");
      setGeneratedUrl(result.payment_link);
      setModalOpen(true);
    } catch (error) {
      console.error("Error generating URL:", error);
    }
  };

  // Handle copy URL to clipboard
  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(generatedUrl)
      .then(() => alert("URL copied to clipboard"))
      .catch((error) => console.error("Error copying to clipboard:", error));
  };

  // Table row component
  const renderTableRow = (order) => (
    <TableRow key={order._id}>
      <TableCell>{order._id}</TableCell>
      <TableCell>{order.order_status}</TableCell>
      <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
      <TableCell>{order.products.length}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          onClick={() => handleGenerateUrl(order._id)}
        >
          Generate URL
        </Button>
      </TableCell>
    </TableRow>
  );

  // Modal style
  const modalStyle = {
    position: "absolute",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <Box sx={{ p: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Order Created At</TableCell>
              <TableCell>Product Count</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{orders.map((order) => renderTableRow(order))}</TableBody>
        </Table>
      </TableContainer>

      {/* Modal to display generated URL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          <IconButton onClick={handleCopyUrl} aria-label="copy" sx={{ mb: 2 }}>
            <FaCopy />
          </IconButton>
          <p style={{ textAlign: "center", fontSize: 16 }}>{generatedUrl}</p>
        </Box>
      </Modal>
    </Box>
  );
};

export default GenerateLink;
