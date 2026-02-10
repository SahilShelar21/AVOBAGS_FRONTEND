import "../styles/cart-drawer.css";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  setCartItems,
}) {
  const navigate = useNavigate();
  const items = Array.isArray(cartItems) ? cartItems : [];

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ===============================
     UPDATE QUANTITY
     =============================== */
  const updateQty = async (id, newQty) => {
    if (newQty < 1) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity: newQty }),
      });

      if (!res.ok) throw new Error("Update failed");

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("QTY UPDATE FAILED", err);
    }
  };

  /* ===============================
     REMOVE ITEM
     =============================== */
  const removeItem = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cart/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("REMOVE FAILED", err);
    }
  };

  /* ===============================
     CHECKOUT
     =============================== */
  const handleCheckout = () => {
    if (items.length === 0) return;

    onClose();

    navigate("/checkout", {
      state: {
        items: items.map((item) => ({
          productId: item.product_id,
          name: item.name,
          image: item.image_url, // already absolute URL from DB
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay open" onClick={onClose} />

      <div className="cart-drawer open">
        <div className="cart-header">
          <h2>Your Bag ({items.length})</h2>
          <button className="close-x" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {items.length === 0 && (
            <p style={{ textAlign: "center", marginTop: 40 }}>
              Your cart is empty
            </p>
          )}

          {items.map((item) => (
            <div className="cart-card" key={item.id}>
              <div className="cart-img-box">
                <img
                  src={item.image_url}
                  alt={item.name}
                />
              </div>

              <div className="cart-details">
                <div className="cart-details-top">
                  <h3>{item.name}</h3>
                  <span className="cart-price">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="cart-actions">
                  <div className="qty-selector">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>

                  <button
                    className="cart-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="subtotal-box">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <p className="tax-text">
            Shipping and taxes calculated at checkout
          </p>

          <div className="cart-btns">
            <button className="btn-checkout" onClick={handleCheckout}>
              Checkout
            </button>
            <button className="btn-continue" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
