import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
import "../styles/static-pages.css";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate("/");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
        const data = await res.json();
        if (data.success) {
          setOrder(data.order);
        } else {
          throw new Error("Order not found");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading order details...</div>;

  if (!order) return <div style={{ padding: "40px", textAlign: "center", color: "red" }}>Order not found</div>;

  const adminNumber = import.meta.env.VITE_ADMIN_WHATSAPP || "919137844068";
  const adminWaLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(`Hi Admin, I have a question about Order ${order.id}`)}`;

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", textAlign: "center", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <h1 style={{ color: "#28a745" }}>✅ Order Placed Successfully!</h1>
      
      <div style={{ marginTop: "30px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", textAlign: "left" }}>
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> #{order.id}</p>
        <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>
        <p><strong>Payment Method:</strong> {order.payment_method === "online" ? "Online Payment" : "Cash on Delivery"}</p>
        <p><strong>Status:</strong> {order.payment_status}</p>

        {/* items detail */}
        {order.items && order.items.length > 0 && (
          <>
            <h3 style={{ marginTop: "20px" }}>Items</h3>
            <ul>
              {order.items.map((it, idx) => (
                <li key={idx} style={{ marginBottom: "6px" }}>
                  {it.name} × {it.quantity} (@ ₹{it.price})
                </li>
              ))}
            </ul>
          </>
        )}

        <h3 style={{ marginTop: "20px" }}>Shipping Address</h3>
        <p>{order.name}</p>
        <p>{order.address}</p>
        <p>{order.city}, {order.state} - {order.pincode}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
      </div>

      <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#e7f3ff", borderRadius: "8px", border: "1px solid #b3d9ff" }}>
        <p style={{ fontSize: "16px", margin: 0 }}>📞 For more details, contact the admin:</p>
        <a href={adminWaLink} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: "10px", padding: "10px 20px", backgroundColor: "#25d366", color: "#fff", textDecoration: "none", borderRadius: "6px", fontWeight: "bold" }}>
          💬 Contact Admin on WhatsApp
        </a>
      </div>

      {/* optional send summary button (e.g. COD waLink from state) */}
      {state?.waLink && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <a href={state.waLink} target="_blank" rel="noreferrer" className="send-admin-btn" style={{ display: "inline-block", padding: "10px 20px", backgroundColor: "#ff6a00", color: "#fff", textDecoration: "none", borderRadius: "6px", fontWeight: "bold" }}>
            📤 Send Order To Admin and generate Invoice
          </a>
        </div>
      )}

      <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px 30px", backgroundColor: "#0b1c2d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}>
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
