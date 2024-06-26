import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let result = [
  {
    txn_amount: 15,
    txn_status: "Success",
    payment_method: "Credit Card",
    txn_id: "667a59200e02e9f7ffd77b06",
    txn_date: "2024-06-24T05:59:52.646Z",
    order_id: "667a59200e02e9f7ffd77b03",
    product_id: "667a59200e02e9f7ffd77afa",
    product_quantity: 1,
    order_status: "Pending",
    _id: "667a59200e02e9f7ffd77afa",
    name: "Beauty-497268112",
    price: 15,
    quantity: 12,
    category: "Beauty",
    seller_name: "Clovis84",
    reviews: [],
  },
  {
    txn_amount: 15,
    txn_status: "Success",
    payment_method: "COD",
    txn_id: "667a59200e02e9f7ffd77b0c",
    txn_date: "2024-06-24T21:59:09.254Z",
    order_id: "667a59200e02e9f7ffd77b09",
    product_id: "667a59200e02e9f7ffd77afa",
    product_quantity: 1,
    order_status: "Pending",
    _id: "667a59200e02e9f7ffd77afa",
    name: "Beauty-497268112",
    price: 15,
    quantity: 12,
    category: "Beauty",
    seller_name: "Clovis84",
    reviews: [],
  },
  {
    txn_amount: 15,
    txn_status: "Success",
    payment_method: "Credit Card",
    txn_id: "667a59200e02e9f7ffd77b36",
    txn_date: "2024-06-24T09:51:04.876Z",
    order_id: "667a59200e02e9f7ffd77b33",
    product_id: "667a59200e02e9f7ffd77afa",
    product_quantity: 1,
    order_status: "Pending",
    _id: "667a59200e02e9f7ffd77afa",
    name: "Beauty-497268112",
    price: 15,
    quantity: 12,
    category: "Beauty",
    seller_name: "Clovis84",
    reviews: [],
  },
  {
    txn_amount: 15,
    txn_status: "Success",
    payment_method: "UPI",
    txn_id: "667a59200e02e9f7ffd77b4e",
    txn_date: "2024-06-24T19:55:48.737Z",
    order_id: "667a59200e02e9f7ffd77b4b",
    product_id: "667a59200e02e9f7ffd77afa",
    product_quantity: 1,
    order_status: "Pending",
    _id: "667a59200e02e9f7ffd77afa",
    name: "Beauty-497268112",
    price: 15,
    quantity: 12,
    category: "Beauty",
    seller_name: "Clovis84",
    reviews: [],
  },
  {
    txn_amount: 7,
    txn_status: "Success",
    payment_method: "COD",
    txn_id: "667a59260e02e9f7ffd77b92",
    txn_date: "2024-06-24T19:10:11.483Z",
    order_id: "667a59260e02e9f7ffd77b8f",
    product_id: "667a59260e02e9f7ffd77b74",
    product_quantity: 1,
    order_status: "Pending",
    _id: "667a59260e02e9f7ffd77b74",
    name: "Fashion-132502586",
    price: 7,
    quantity: 16,
    category: "Fashion",
    seller_name: "Trudie15",
    reviews: [],
  },
  {
    txn_amount: 7,
    txn_status: "Success",
    payment_method: "Credit Card",
    txn_id: "667a59260e02e9f7ffd77b98",
    txn_date: "2024-06-24T19:45:57.368Z",
    order_id: "667a59260e02e9f7ffd77b95",
    product_id: "667a59260e02e9f7ffd77b74",
    product_quantity: 1,
    order_status: "Cancelled",
    _id: "667a59260e02e9f7ffd77b74",
    name: "Fashion-132502586",
    price: 7,
    quantity: 16,
    category: "Fashion",
    seller_name: "Trudie15",
    reviews: [],
  },
  {
    txn_amount: 6,
    txn_status: "Success",
    payment_method: "UPI",
    txn_id: "667ab58e6a6169ad02e7149b",
    txn_date: "2024-06-25T05:52:41.592Z",
    order_id: "667ab58e6a6169ad02e71498",
    product_id: "667ab58e6a6169ad02e7148f",
    product_quantity: 1,
    order_status: "Confirmed",
    _id: "667ab58e6a6169ad02e7148f",
    name: "Mobiles-137756581",
    price: 6,
    quantity: 25,
    category: "Mobiles",
    seller_name: "Glen_Nitzsche",
    reviews: [],
  },
  {
    txn_amount: 6,
    txn_status: "Success",
    payment_method: "Debit Card",
    txn_id: "667ab58e6a6169ad02e714ad",
    txn_date: "2024-06-25T09:15:30.194Z",
    order_id: "667ab58e6a6169ad02e714aa",
    product_id: "667ab58e6a6169ad02e7148f",
    product_quantity: 1,
    order_status: "Pending",
    _id: "667ab58e6a6169ad02e7148f",
    name: "Mobiles-137756581",
    price: 6,
    quantity: 25,
    category: "Mobiles",
    seller_name: "Glen_Nitzsche",
    reviews: [],
  },
];
const TxnReport = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    order_status: "",
    txn_status: "",
    payment_method: "",
    category: "",
    txn_from_date: "",
    txn_to_date: "",
  });

  useEffect(() => {
    // Fetch data from API when the component mounts
    const fetchData = async () => {
      try {
        // const response = await fetch('API_ENDPOINT');
        // const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = [...data];

    if (filters.order_status) {
      filtered = filtered.filter(
        (item) => item.order_status === filters.order_status
      );
    }
    if (filters.txn_status) {
      filtered = filtered.filter(
        (item) => item.txn_status === filters.txn_status
      );
    }
    if (filters.payment_method) {
      filtered = filtered.filter(
        (item) => item.payment_method === filters.payment_method
      );
    }
    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category);
    }
    if (filters.txn_from_date) {
      filtered = filtered.filter(
        (item) => new Date(item.txn_date) >= new Date(filters.txn_from_date)
      );
    }
    if (filters.txn_to_date) {
      filtered = filtered.filter(
        (item) => new Date(item.txn_date) <= new Date(filters.txn_to_date)
      );
    }

    setFilteredData(filtered);
    toast.success("Filters applied successfully");
  };

  const clearFilters = () => {
    setFilters({
      order_status: "",
      txn_status: "",
      payment_method: "",
      category: "",
      txn_from_date: "",
      txn_to_date: "",
    });
    setFilteredData(data);
  };

  const columns = [
    { field: "txn_id", headerName: "Transaction ID", width: 150 },
    { field: "txn_amount", headerName: "Amount", width: 100 },
    { field: "txn_status", headerName: "Transaction Status", width: 150 },
    { field: "payment_method", headerName: "Payment Method", width: 150 },
    { field: "txn_date", headerName: "Transaction Date", width: 200 },
    { field: "order_id", headerName: "Order ID", width: 150 },
    { field: "product_id", headerName: "Product ID", width: 150 },
    { field: "product_quantity", headerName: "Product Quantity", width: 150 },
    { field: "order_status", headerName: "Order Status", width: 150 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "seller_name", headerName: "Seller Name", width: 150 },
  ];

  return (
    <Box p={3}>
      <Box mb={3} display="flex" gap={2} flexWrap="wrap">
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Order Status</InputLabel>
          <Select
            name="order_status"
            value={filters.order_status}
            onChange={handleFilterChange}
            label="Order Status"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Transaction Status</InputLabel>
          <Select
            name="txn_status"
            value={filters.txn_status}
            onChange={handleFilterChange}
            label="Transaction Status"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Success">Success</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select
            name="payment_method"
            value={filters.payment_method}
            onChange={handleFilterChange}
            label="Payment Method"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Debit Card">Debit Card</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="COD">COD</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Beauty">Beauty</MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Mobiles">Mobiles</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="From Date"
          type="date"
          name="txn_from_date"
          value={filters.txn_from_date}
          onChange={handleFilterChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="To Date"
          type="date"
          name="txn_to_date"
          value={filters.txn_to_date}
          onChange={handleFilterChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="contained" color="secondary" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          getRowId={(row) => row.txn_id}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default TxnReport;
