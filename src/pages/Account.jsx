import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const Account = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const sessionId = localStorage.getItem("sessionId");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "x-session-id": sessionId || "",
          },
        });

        if (!res.ok) {
          setOrders([]);
          return;
        }

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (!user) return <p>Please login</p>;
  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user.name}
      </h2>

      <h3 className="text-xl font-semibold mb-3">
        Your Orders
      </h3>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div
          key={order.id}
          className="border p-4 rounded mb-4 bg-white"
        >
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Total:</strong> ₹{order.total_amount}</p>
          <p><strong>Status:</strong> {order.payment_status}</p>
        </div>
      ))}
    </div>
  );
};

export default Account;
