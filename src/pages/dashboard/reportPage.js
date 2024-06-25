import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// let {fetchReportData} = require(../model/data)

let data =  {
    "sales_volume": 197,
    "payment_method": [
        {
            "count": 7,
            "totalSaleByPayMethod": 81,
            "paymentMethod": "Credit Card"
        },
        {
            "count": 5,
            "totalSaleByPayMethod": 43,
            "paymentMethod": "COD"
        },
        {
            "count": 4,
            "totalSaleByPayMethod": 44,
            "paymentMethod": "Debit Card"
        },
        {
            "count": 3,
            "totalSaleByPayMethod": 29,
            "paymentMethod": "UPI"
        }
    ],
    "txn_status": [
        {
            "count": 19,
            "paymentStatus": "Success"
        },
        {
            "count": 11,
            "paymentStatus": "Pending"
        },
        {
            "count": 11,
            "paymentStatus": "Failed"
        }
    ],
    "txn_data": [
        {
            "txn_amount": 15,
            "txn_status": "Success",
            "payment_method": "Debit Card",
            "txn_id": "667a59200e02e9f7ffd77b00",
            "txn_date": "2024-06-24T14:02:58.175Z",
            "order_id": "667a59200e02e9f7ffd77afd",
            "product_id": "667a59200e02e9f7ffd77afa",
            "product_quantity": 1,
            "order_status": "Cancelled",
            "_id": "667a59200e02e9f7ffd77afa",
            "name": "Beauty-497268112",
            "price": 15,
            "quantity": 12,
            "category": "Beauty",
            "seller_name": "Clovis84",
            "reviews": []
        },
        {
            "txn_amount": 15,
            "txn_status": "Success",
            "payment_method": "Credit Card",
            "txn_id": "667a59200e02e9f7ffd77b06",
            "txn_date": "2024-06-24T05:59:52.646Z",
            "order_id": "667a59200e02e9f7ffd77b03",
            "product_id": "667a59200e02e9f7ffd77afa",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59200e02e9f7ffd77afa",
            "name": "Beauty-497268112",
            "price": 15,
            "quantity": 12,
            "category": "Beauty",
            "seller_name": "Clovis84",
            "reviews": []
        },
        {
            "txn_amount": 15,
            "txn_status": "Success",
            "payment_method": "COD",
            "txn_id": "667a59200e02e9f7ffd77b0c",
            "txn_date": "2024-06-24T21:59:09.254Z",
            "order_id": "667a59200e02e9f7ffd77b09",
            "product_id": "667a59200e02e9f7ffd77afa",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59200e02e9f7ffd77afa",
            "name": "Beauty-497268112",
            "price": 15,
            "quantity": 12,
            "category": "Beauty",
            "seller_name": "Clovis84",
            "reviews": []
        },
        {
            "txn_amount": 15,
            "txn_status": "Success",
            "payment_method": "Credit Card",
            "txn_id": "667a59200e02e9f7ffd77b36",
            "txn_date": "2024-06-24T09:51:04.876Z",
            "order_id": "667a59200e02e9f7ffd77b33",
            "product_id": "667a59200e02e9f7ffd77afa",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59200e02e9f7ffd77afa",
            "name": "Beauty-497268112",
            "price": 15,
            "quantity": 12,
            "category": "Beauty",
            "seller_name": "Clovis84",
            "reviews": []
        },
        {
            "txn_amount": 15,
            "txn_status": "Success",
            "payment_method": "UPI",
            "txn_id": "667a59200e02e9f7ffd77b4e",
            "txn_date": "2024-06-24T19:55:48.737Z",
            "order_id": "667a59200e02e9f7ffd77b4b",
            "product_id": "667a59200e02e9f7ffd77afa",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59200e02e9f7ffd77afa",
            "name": "Beauty-497268112",
            "price": 15,
            "quantity": 12,
            "category": "Beauty",
            "seller_name": "Clovis84",
            "reviews": []
        },
        {
            "txn_amount": 15,
            "txn_status": "Success",
            "payment_method": "Credit Card",
            "txn_id": "667a59200e02e9f7ffd77b5a",
            "txn_date": "2024-06-24T22:44:11.784Z",
            "order_id": "667a59200e02e9f7ffd77b57",
            "product_id": "667a59200e02e9f7ffd77afa",
            "product_quantity": 1,
            "order_status": "Cancelled",
            "_id": "667a59200e02e9f7ffd77afa",
            "name": "Beauty-497268112",
            "price": 15,
            "quantity": 12,
            "category": "Beauty",
            "seller_name": "Clovis84",
            "reviews": []
        },
        {
            "txn_amount": 15,
            "txn_status": "Success",
            "payment_method": "Credit Card",
            "txn_id": "667a59200e02e9f7ffd77b66",
            "txn_date": "2024-06-24T23:22:10.585Z",
            "order_id": "667a59200e02e9f7ffd77b63",
            "product_id": "667a59200e02e9f7ffd77afa",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59200e02e9f7ffd77afa",
            "name": "Beauty-497268112",
            "price": 15,
            "quantity": 12,
            "category": "Beauty",
            "seller_name": "Clovis84",
            "reviews": []
        },
        {
            "txn_amount": 15,
            "txn_status": "Success",
            "payment_method": "Debit Card",
            "txn_id": "667a59200e02e9f7ffd77b6c",
            "txn_date": "2024-06-24T21:38:40.389Z",
            "order_id": "667a59200e02e9f7ffd77b69",
            "product_id": "667a59200e02e9f7ffd77afa",
            "product_quantity": 1,
            "order_status": "Confirmed",
            "_id": "667a59200e02e9f7ffd77afa",
            "name": "Beauty-497268112",
            "price": 15,
            "quantity": 12,
            "category": "Beauty",
            "seller_name": "Clovis84",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "Credit Card",
            "txn_id": "667a59260e02e9f7ffd77b80",
            "txn_date": "2024-06-24T15:19:46.571Z",
            "order_id": "667a59260e02e9f7ffd77b7d",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Cancelled",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "COD",
            "txn_id": "667a59260e02e9f7ffd77b92",
            "txn_date": "2024-06-24T19:10:11.483Z",
            "order_id": "667a59260e02e9f7ffd77b8f",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "Credit Card",
            "txn_id": "667a59260e02e9f7ffd77b98",
            "txn_date": "2024-06-24T19:45:57.368Z",
            "order_id": "667a59260e02e9f7ffd77b95",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Cancelled",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "COD",
            "txn_id": "667a59260e02e9f7ffd77bb0",
            "txn_date": "2024-06-24T20:57:11.396Z",
            "order_id": "667a59260e02e9f7ffd77bad",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "COD",
            "txn_id": "667a59260e02e9f7ffd77bb6",
            "txn_date": "2024-06-24T09:39:31.521Z",
            "order_id": "667a59260e02e9f7ffd77bb3",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "Credit Card",
            "txn_id": "667a59260e02e9f7ffd77bbc",
            "txn_date": "2024-06-24T23:55:47.646Z",
            "order_id": "667a59260e02e9f7ffd77bb9",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "Debit Card",
            "txn_id": "667a59260e02e9f7ffd77bc2",
            "txn_date": "2024-06-24T18:15:43.031Z",
            "order_id": "667a59260e02e9f7ffd77bbf",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "UPI",
            "txn_id": "667a59260e02e9f7ffd77bc8",
            "txn_date": "2024-06-24T10:32:57.856Z",
            "order_id": "667a59260e02e9f7ffd77bc5",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "Debit Card",
            "txn_id": "667a59260e02e9f7ffd77bce",
            "txn_date": "2024-06-25T00:17:28.261Z",
            "order_id": "667a59260e02e9f7ffd77bcb",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Cancelled",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "UPI",
            "txn_id": "667a59260e02e9f7ffd77be0",
            "txn_date": "2024-06-24T06:14:22.832Z",
            "order_id": "667a59260e02e9f7ffd77bdd",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Confirmed",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        },
        {
            "txn_amount": 7,
            "txn_status": "Success",
            "payment_method": "COD",
            "txn_id": "667a59260e02e9f7ffd77be6",
            "txn_date": "2024-06-24T11:00:56.589Z",
            "order_id": "667a59260e02e9f7ffd77be3",
            "product_id": "667a59260e02e9f7ffd77b74",
            "product_quantity": 1,
            "order_status": "Pending",
            "_id": "667a59260e02e9f7ffd77b74",
            "name": "Fashion-132502586",
            "price": 7,
            "quantity": 16,
            "category": "Fashion",
            "seller_name": "Trudie15",
            "reviews": []
        }
    ]
}

const ReportDashboard = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        // const response = await fetchReportData();
    //   setReportData(response.data);
      setReportData(data);
    };
    fetchData();
  }, []);

  if (!reportData) {
    return <div>Loading report data...</div>;
  }

  const { sales_volume, payment_method, txn_status, txn_data } = reportData;

  // Process data for payment method chart
  const paymentMethodChartData = payment_method.map((method) => ({
    name: method.paymentMethod,
    success_txn: method.count,
    sales$: method.totalSaleByPayMethod,
  }));

  // Process data for transaction status chart
  const transactionStatusChartData = txn_status.map((status) => ({
    name: status.paymentStatus,
    count: status.count,
  }));

  // Process data for category-wise chart
  const categoryData = ["Electronics", "Mobiles", "Fashion", "Beauty"];
  const categoryChartData = categoryData.map((category) => {
    const filteredData = txn_data.filter((txn) => txn.category === category);
    const totalQuantity = filteredData.reduce((acc, txn) => acc + txn.product_quantity, 0);
    const totalAmount = filteredData.reduce((acc, txn) => acc + txn.txn_amount, 0);
    return {
      category,
      totalQuantity,
      totalAmount,
    };
  });

  return (
    <div className="report-container">
      <h2>Transaction Report</h2>
      <div className="report-section">
        <h3>Sales Volume</h3>
        <p>Total Sales: ${sales_volume}</p>
      </div>
      <div className="report-section">
        <h3>Category-wise Product Quantity and Transaction Amount</h3>
        <BarChart width={700} height={300} data={categoryChartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalQuantity" fill="#8884d8" />
          <Bar dataKey="totalAmount" stackId="a" fill="#82ca9d" />
        </BarChart>
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
        <BarChart width={500} height={300} data={transactionStatusChartData}>
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