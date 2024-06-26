import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { getTxnDoneOrder } from "../../features/common/commonSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await dispatch(getTxnDoneOrder());

        // Check if response.payload exists before accessing its properties
        if (response.payload) {
          const data = response.payload.data;
          setOrders(data);
        } else {
          console.error("Unexpected response format from getTxnDoneOrder");
        }

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [dispatch]);

  const orderStyles = {
    headerMain: {
      backgroundColor: "#ffffff",
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    ordersContainer: {
      padding: "20px",
      backgroundColor: "#ffffff",
    },
    ordersList: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    orderCard: {
      border: "1px solid #ddd",
      padding: "20px",
      borderRadius: "8px",
      background: "#ffffff",
    },
    orderCardH2: {
      margin: "0",
    },
    statusBadge: {
      display: "inline-block",
      padding: "5px 10px",
      borderRadius: "5px",
      color: "#fff",
    },
    successBadge: {
      background: "green",
    },
    failedBadge: {
      background: "red",
    },
    orderDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    productDetails: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    productImage: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    productInfoH3: {
      margin: "0",
    },
    productInfoP: {
      margin: "5px 0",
    },
  };

  return (
    <div className="orders-container" style={orderStyles.ordersContainer}>
      <h1>Your Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error fetching orders: {error.message}</p>
      ) : orders.length === 0 ? (
        <p>No Order Found</p>
      ) : (
        <div className="orders-list" style={orderStyles.ordersList}>
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="order-card"
              style={orderStyles.orderCard}
            >
              <div className="header-main" style={orderStyles.headerMain}>
                <h2 style={orderStyles.orderCardH2}>Order #{order._id}</h2>
                <div
                  className={`status-badge ${
                    order.order_status === "Pending" ? "pending" : "completed"
                  }`}
                  style={{
                    ...orderStyles.statusBadge,
                    ...(order.order_status === "Pending"
                      ? orderStyles.failedBadge
                      : orderStyles.successBadge),
                  }}
                >
                  {order.order_status}
                </div>
              </div>

              <div className="order-details" style={orderStyles.orderDetails}>
                {order.products.map((item, index) => (
                  <div
                    key={item._id}
                    className="product-details"
                    style={orderStyles.productDetails}
                  >
                    {/* <img
                      src={item.product_image} // Assuming product_image exists in your data structure
                      alt={item.name}
                      className="product-image"
                      style={orderStyles.productImage}
                    /> */}
                    <div className="product-info">
                      <h3 style={orderStyles.productInfoH3}>{item.name}</h3>
                      <p style={orderStyles.productInfoP}>
                        Quantity: {item.product_quantity}
                      </p>
                      <p
                        style={{
                          ...orderStyles.productInfoP,
                          fontWeight: "bold",
                        }}
                      >
                        Price: ₹ {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
