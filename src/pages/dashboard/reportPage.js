import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

let data = {
  sales_volume: 22,
  payment_method: [
    {
      count: 1,
      totalSaleByPayMethod: 5,
      paymentMethod: "Credit Card",
    },
    {
      count: 1,
      totalSaleByPayMethod: 9,
      paymentMethod: "UPI",
    },
    {
      count: 1,
      totalSaleByPayMethod: 8,
      paymentMethod: "Debit Card",
    },
  ],
  txn_status: [
    {
      count: 6,
      paymentStatus: "Failed",
    },
    {
      count: 5,
      paymentStatus: "Pending",
    },
    {
      count: 3,
      paymentStatus: "Success",
    },
  ],
};

const ReportDashboard = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //   const response = await fetchReportData();
      setReportData(data);
    };
    fetchData();
  }, []);

  if (!reportData) {
    return <div>Loading report data...</div>;
  }

  const { sales_volume, payment_method, txn_status } = reportData;

  const paymentMethodChartData = payment_method.map((method) => ({
    name: method.paymentMethod,
    success_txn: method.count,
    sales$: method.totalSaleByPayMethod,
  }));

  const transactionStatusChartData = txn_status.map((status) => ({
    name: status.paymentStatus,
    count: status.count,
  }));

  return (
    <div className="report-container">
      <h2>Transaction Report</h2>
      <div className="report-section">
        <h3>Sales Volume</h3>
        <p>Total Sales: ${sales_volume}</p>
      </div>
      <div className="report-section">
        <h3>Payment Methods</h3>
        <BarChart width={700} height={300} data={paymentMethodChartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="success_txn" fill="#8884d8" />
          <Bar dataKey="sales$" stackId="a" fill="#ffc107" />
        </BarChart>
      </div>
      <div className="report-section">
        <h3>Transaction Status</h3>
        <BarChart width={700} height={300} data={transactionStatusChartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ffc107" />
        </BarChart>
      </div>
    </div>
  );
};

export default ReportDashboard;
