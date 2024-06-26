import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useDispatch } from "react-redux";
let { getPredictProduct } = require("../../features/common/commonSlice");

const PredictiveAnalytics = () => {
  const dispatch = useDispatch();
  const [predictedData, setPredictedData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // let response = {
      //   _id: "667a58e86d3b79acb4f0ab43",
      //   name: "Fashion-57632658",
      //   description:
      //     "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      //   price: 7,
      //   quantity: 42,
      //   category: "Fashion",
      //   seller_name: "Annamarie_Hickle17",
      // };
      let response = await dispatch(getPredictProduct());

      // response.payload = null;

      let result = response.payload.data;
      setPredictedData(result);
    } catch (error) {
      console.error("Error fetching predicted data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : predictedData ? (
        <div>
          <h2>ML Predicted Product Data</h2>
          <p>
            Based on txn report data ML model forecasting with diffrent
            parameter like category, txn_status(Success), price, purchase
            quantity based on that suggest Future Product .!
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={[predictedData]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ payload, label, active }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="custom-tooltip">
                        <p>{`Category: ${data.category}`}</p>
                        <p>{`Product Name: ${data.name}`}</p>
                        <p>{`Price: $${data.price}`}</p>
                        <p>{`Quantity: ${data.quantity}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="price" fill="#8884d8" />
              <Bar dataKey="quantity" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No predicted data available.</p>
      )}
    </div>
  );
};

export default PredictiveAnalytics;
