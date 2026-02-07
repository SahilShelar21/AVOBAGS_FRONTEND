import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/checkout.css";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const items = state?.items || [];

  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ===============================
     HANDLE INPUT CHANGE
  =============================== */
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  /* ===============================
     PLACE ORDER
  =============================== */
  const placeOrder = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create order in DB
      const orderRes = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: localStorage.getItem("sessionId"),
          customer,
          items: items.map((item) => ({
            productId: item.product_id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image_url,
          })),
          totalAmount,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error("Order failed");

      // 2️⃣ Create Razorpay order
      const paymentRes = await fetch(
        "http://localhost:5000/api/orders/payment/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalAmount,
            orderId: orderData.orderId,
          }),
        }
      );

      const razorpayOrder = await paymentRes.json();

      // 3️⃣ Open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Your Store",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          await fetch("http://localhost:5000/api/orders/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          navigate("/success");
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        theme: {
          color: "#000",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      alert("Payment failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-left">
        <h2>Shipping Details</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="state" placeholder="State" onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} />

        <button onClick={placeOrder} disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      <div className="checkout-right">
        <h3>Order Summary</h3>

        {items.map((item) => (
          <div key={item.id} className="summary-item">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr />
        <div className="summary-total">
          <strong>Total</strong>
          <strong>₹{totalAmount}</strong>
        </div>
      </div>
    </div>
  );
}
