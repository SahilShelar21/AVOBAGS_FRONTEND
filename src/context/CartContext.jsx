import { createContext, useContext, useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // ✅ Load saved cart on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // ✅ Save to localStorage automatically
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ✅ Add product
  const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await fetch(`${API_BASE_URL}/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product.id,
            quantity,
          }),
        });
      } catch (err) {
        console.error("Backend cart add failed:", err);
      }
    }

    // Local update
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // ✅ Update quantity
  const updateQty = (id, newQty) => {
    setItems((prev) =>
      newQty < 1
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) =>
            i.id === id ? { ...i, quantity: newQty } : i
          )
    );
  };

  // ✅ Remove item
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // ✅ Clear cart
  const clearCart = () => setItems([]);

  // ✅ Subtotal
  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
