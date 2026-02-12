import { useState } from "react";
import "../styles/cod-confirm-modal.css";
import API_BASE_URL from "../config/api";

export default function CodConfirmModal({
  open,
  onClose,
  items,
  total,
  customer,
  onOrderCreated,
}) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ REQUIRED
        },
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

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        throw new Error("Order failed");}

      const data = await res.json();


      if (!data.success) throw new Error("Order failed");

      onOrderCreated(data.orderId);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
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
            {loading ? "Processing..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
