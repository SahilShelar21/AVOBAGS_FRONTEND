import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/checkouts.css";
import API_BASE_URL from "../config/api";
import CodConfirmModal from "../components/CodConfirmModal";

export default function Checkouts() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const items = state?.items || [];

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [errors, setErrors] = useState({});
  const [showCodModal, setShowCodModal] = useState(false);

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
    let temp = {};

    if (!customer.name.trim()) temp.name = "Full Name is required";
    if (!/\S+@\S+\.\S+/.test(customer.email))
      temp.email = "Valid Email required";
    if (customer.email !== customer.confirmEmail)
      temp.confirmEmail = "Emails do not match";
    if (!/^\d{10}$/.test(customer.phone))
      temp.phone = "Valid 10-digit phone required";
    if (!customer.address.trim()) temp.address = "Address required";
    if (!customer.city.trim()) temp.city = "City required";
    if (!customer.state.trim()) temp.state = "State required";
    if (!customer.pincode.trim()) temp.pincode = "Pincode required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  /* ---------------- PLACE ORDER ---------------- */
const placeOrder = async () => {
  if (!validate()) return;
  if (!items.length) return alert("Your cart is empty");

  if (paymentMethod === "cod") {
    setShowCodModal(true);
    return;
  }

  try {
    setLoading(true);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: totalAmount * 100,
      currency: "INR",
      name: "AVOBAGS",
      description: "Secure Order Payment",
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      theme: { color: "#0b1c2d" },

      handler: async function (response) {
        try {
          const verifyRes = await fetch(
            `${API_BASE_URL}/api/orders/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  name: customer.name,
                  email: customer.email,
                  phone: customer.phone,
                  address: customer.address,
                  city: customer.city,
                  state: customer.state,
                  pincode: customer.pincode,
                  total_amount: totalAmount,
                  session_id: Date.now().toString(),
                },
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (!verifyData.success)
            throw new Error("Payment verification failed");

          navigate("/order-success", {
            state: { orderId: verifyData.order.id },
          });
        } catch (err) {
          console.error(err);
          alert("Payment verification failed.");
        }
      },

      modal: {
        ondismiss: function () {
          alert("Payment popup closed.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Something went wrong during payment.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="checkout">
        {/* LEFT SIDE */}
        <div className="checkout-left">
          <h2>Shipping Details</h2>

          <div className="input-group">
            <div className="full-width">
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            <input
              name="confirmEmail"
              placeholder="Confirm Email"
              onChange={handleChange}
              className={errors.confirmEmail ? "error" : ""}
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
            />

            <div className="full-width">
              <input
                name="address"
                placeholder="Address"
                onChange={handleChange}
                className={errors.address ? "error" : ""}
              />
            </div>

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className={errors.city ? "error" : ""}
            />

            <input
              name="state"
              placeholder="State"
              onChange={handleChange}
              className={errors.state ? "error" : ""}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className={errors.pincode ? "error" : ""}
            />
          </div>

          {/* PAYMENT METHOD */}
          <div className="payment-method">
            <h4>Payment Method</h4>

            <label className="payment-option">
              <input
                type="radio"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Pay Online (Razorpay)</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
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

        {/* RIGHT SIDE */}
        <div className="checkout-right">
          <h3>Order Summary</h3>

          {items.map((item, index) => (
            <div key={index} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>

      <CodConfirmModal
        open={showCodModal}
        onClose={() => setShowCodModal(false)}
        items={items}
        total={totalAmount}
        customer={customer}
        onOrderCreated={(orderId) =>
          navigate("/order-success", { state: { orderId } })
        }
      />
    </>
  );
}
