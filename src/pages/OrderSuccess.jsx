import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
import "../styles/order-success.css";

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

  if (loading)
    return <div className="order-loading">Loading order details...</div>;

  if (!order)
    return <div className="order-error">Order not found</div>;

  const adminNumber =
    import.meta.env.VITE_ADMIN_WHATSAPP || "919137844068";

  const adminWaLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
    `Hi Admin, I have a question about Order ${order.id}`
  )}`;

  return (
    <div className="order-success-container">

      <div className="success-card">

        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully</h1>
        <p className="success-sub">
          Thank you for shopping with us. Your order has been received.
        </p>

        <div className="order-box">

          <h3>Order Details</h3>

          <div className="order-row">
            <span>Order ID</span>
            <strong>#{order.id}</strong>
          </div>

          <div className="order-row">
            <span>Total Amount</span>
            <strong>₹{order.total_amount}</strong>
          </div>

          <div className="order-row">
            <span>Payment</span>
            <strong>
              {order.payment_method === "online"
                ? "Online Payment"
                : "Cash on Delivery"}
            </strong>
          </div>

          <div className="order-row">
            <span>Status</span>
            <strong>{order.payment_status}</strong>
          </div>

          {order.items && order.items.length > 0 && (
            <>
              <h3 className="items-title">Items</h3>

              <div className="items-list">
                {order.items.map((it, idx) => (
                  <div key={idx} className="item-row">
                    <span>{it.name}</span>
                    <span>
                      {it.quantity} × ₹{it.price}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className="items-title">Shipping Address</h3>

          <div className="address-box">
            <p>{order.name}</p>
            <p>{order.address}</p>
            <p>
              {order.city}, {order.state} - {order.pincode}
            </p>
            <p>
              <strong>Phone:</strong> {order.phone}
            </p>
          </div>

        </div>

        <div className="support-box">

          <p>Need help with your order?</p>

          <a
            href={adminWaLink}
            target="_blank"
            rel="noreferrer"
            className="wa-btn"
          >
            Contact Admin on WhatsApp
          </a>

        </div>

        {state?.waLink && (
          <a
            href={state.waLink}
            target="_blank"
            rel="noreferrer"
            className="invoice-btn"
          >
            Send Order To Admin & Generate Invoice
          </a>
        )}

        <button
          onClick={() => navigate("/")}
          className="continue-btn"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
};

export default OrderSuccess;