import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE_URL}/api/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .catch(err => console.error(err));
  }, [token]);

  if (!token) return <p>Please login to see your orders.</p>;

return (
  <div style={{ padding: "120px 40px" }}>
    <h2>My Orders</h2>

    {orders.length === 0 && <p>No orders yet.</p>}

    {orders.map(order => (
      <div
        key={order.id}
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 20,
          marginTop: 20,
          boxShadow: "0 5px 20px rgba(0,0,0,0.05)"
        }}
      >
        <h4>Order #{order.id}</h4>
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Address:</strong> {order.address}, {order.city}</p>
        <p><strong>Total:</strong> ₹{order.total_amount}</p>
        <p><strong>Status:</strong> {order.payment_status}</p>
      </div>
    ))}
  </div>
);
}
