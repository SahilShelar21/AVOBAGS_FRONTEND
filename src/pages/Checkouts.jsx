import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/checkout.css";
import API_BASE_URL from "../config/api";


export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const items = state?.items || [];

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [errors, setErrors] = useState({});

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    confirmEmail: "",
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

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    let tempErrors = {};

    if (!customer.name.trim())
      tempErrors.name = "Full Name is required";

    if (!customer.email || !/\S+@\S+\.\S+/.test(customer.email))
      tempErrors.email = "Valid Email is required";

    if (customer.email !== customer.confirmEmail)
      tempErrors.confirmEmail = "Emails do not match";

    if (!customer.phone || customer.phone.length < 10)
      tempErrors.phone = "Valid Phone number is required";

    if (!customer.address.trim())
      tempErrors.address = "Address is required";

    if (!customer.city.trim())
      tempErrors.city = "City is required";

    if (!customer.state.trim())
      tempErrors.state = "State is required";

    if (!customer.pincode.trim())
      tempErrors.pincode = "Pincode is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /* ---------------- PLACE ORDER ---------------- */
  const placeOrder = async () => {
    if (!validate()) return;

    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      /* 1️⃣ CREATE ORDER IN DB */
      const orderRes = await fetch(
        `${API_BASE_URL}/api/orders/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: localStorage.getItem("sessionId"),
            customer,
            paymentMethod,
            items: items.map((item) => ({
              productId: item.product_id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image_url,
            })),
            totalAmount,
          }),
        }
      );

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error("Order creation failed");

      /* 🟡 CASH ON DELIVERY */
      if (paymentMethod === "cod") {
        navigate("/success", {
          state: { orderId: orderData.orderId, email: customer.email },
        });
        return;
      }

      /* 🔵 RAZORPAY PAYMENT */
      const paymentRes = await fetch(
        `${API_BASE_URL}/api/orders/payment/create`,
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

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "AVOBAGS",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          await fetch(`${API_BASE_URL}/api/orders/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              orderId: orderData.orderId,
            }),
          });

          navigate("/success", {
            state: { orderId: orderData.orderId, email: customer.email },
          });
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        theme: { color: "#0b1c2d" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="checkout">
      <div className="checkout-left">
        <h2>Shipping Details</h2>

        <div className="input-group">
          <input
            name="name"
            placeholder="Full Name"
            className={errors.name ? "error" : ""}
            onChange={handleChange}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

          <input
            name="email"
            placeholder="Email Address"
            className={errors.email ? "error" : ""}
            onChange={handleChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <input
            name="confirmEmail"
            placeholder="Confirm Email"
            className={errors.confirmEmail ? "error" : ""}
            onChange={handleChange}
          />
          {errors.confirmEmail && (
            <span className="error-text">{errors.confirmEmail}</span>
          )}

          <input
            name="phone"
            placeholder="Phone"
            className={errors.phone ? "error" : ""}
            onChange={handleChange}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}

          <input
            name="address"
            placeholder="Address"
            className={errors.address ? "error" : ""}
            onChange={handleChange}
          />
          {errors.address && (
            <span className="error-text">{errors.address}</span>
          )}

          <input
            name="city"
            placeholder="City"
            className={errors.city ? "error" : ""}
            onChange={handleChange}
          />
          {errors.city && <span className="error-text">{errors.city}</span>}

          <input
            name="state"
            placeholder="State"
            className={errors.state ? "error" : ""}
            onChange={handleChange}
          />
          {errors.state && <span className="error-text">{errors.state}</span>}

          <input
            name="pincode"
            placeholder="Pincode"
            className={errors.pincode ? "error" : ""}
            onChange={handleChange}
          />
          {errors.pincode && (
            <span className="error-text">{errors.pincode}</span>
          )}
        </div>

        <div className="payment-method">
          <h4>Payment Method</h4>

          <label>
            <input
              type="radio"
              value="razorpay"
              checked={paymentMethod === "razorpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay Online (Razorpay)
          </label>

          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        <button
          className="btn-place-order"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : paymentMethod === "cod"
            ? "Place Order"
            : "Pay Now"}
        </button>
      </div>

      <div className="checkout-right">
        <h3>Order Summary</h3>

        {items.map((item) => (
          <div
            key={item.product_id}
            className="summary-item"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <div className="summary-total">
          <strong>Total</strong>
          <strong>₹{totalAmount}</strong>
        </div>
      </div>
    </div>
  );
}
