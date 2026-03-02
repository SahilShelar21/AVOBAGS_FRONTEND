import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cod-confirm-modal.css";
import API_BASE_URL from "../config/api";

export default function CodConfirmModal({ open, onClose, items, total, customer, onOrderCreated }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!open) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/api/orders/create`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          sessionId: localStorage.getItem("sessionId"),
          customer,
          items: items.map((i) => ({
            productId: i.product_id || i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image || i.image_url,
          })),
          totalAmount: total,
          paymentMethod: "cod",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        const msg = data?.message || "Order failed";
        throw new Error(msg);
      }

      // Close modal and navigate to success page with orderId + waLink
      onClose();
      navigate("/order-success", {
        state: { orderId: data.orderId, waLink: data.waLink },
        replace: true,
      });

    } catch (err) {
      console.error(err);
      alert(`Order failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cod-modal-overlay">
      <div className="cod-modal-card">
        <h2>Confirm Your Order</h2>
        {items.map((item, index) => (
          <div key={`${item.product_id || item.productId}-${index}`}>
            {item.name} × {item.quantity}
          </div>
        ))}

        <p><strong>Total:</strong> ₹{total}</p>
        <p><strong>Payment:</strong> Cash on Delivery</p>

        <div className="cod-modal-actions">
          <button onClick={onClose} disabled={loading}>Cancel</button>
          <button onClick={handleConfirm} disabled={loading}>
            {loading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
