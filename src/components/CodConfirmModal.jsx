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
            product_id: i.product_id || i.productId,
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

        <h2 className="cod-modal-title">Confirm Your Order</h2>

        <div className="cod-modal-items">
          {items.map((item, index) => (
            <div
              className="cod-modal-item"
              key={`${item.product_id || item.productId}-${index}`}
            >
              <img src={item.image || item.image_url} alt={item.name} />

              <div>
                <div className="item-name">{item.name}</div>
                <div className="item-qty-price">
                  Qty: {item.quantity} × ₹{item.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cod-modal-total">
          Total: ₹{total}
        </div>

        <div className="cod-modal-payment">
          Payment: Cash on Delivery
        </div>

        <div className="cod-modal-actions">
          <button
            className="btn-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn-confirm"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm Order"}
          </button>
        </div>

      </div>
    </div>
  );
}