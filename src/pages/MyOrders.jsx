import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/user/${userId}`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p>Order ID: {order.id}</p>
          <p>Total Amount: ₹{order.total_amount}</p>
          <p>Payment Status: {order.payment_status}</p>
          <p>Payment ID: {order.razorpay_payment_id || "COD"}</p>
          <p>Order Date: {new Date(order.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
