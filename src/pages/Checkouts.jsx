import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/checkouts.css";
import API_BASE_URL from "../config/api";
import CodConfirmModal from "../components/CodConfirmModal"; // ✅ IMPORT MODAL

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const items = state?.items || [];

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [errors, setErrors] = useState({});
  const [showCodModal, setShowCodModal] = useState(false); // ✅ NEW

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

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let tempErrors = {};

    if (!customer.name.trim()) tempErrors.name = "Full Name is required";
    if (!customer.email || !/\S+@\S+\.\S+/.test(customer.email))
      tempErrors.email = "Valid Email is required";
    if (customer.email !== customer.confirmEmail)
      tempErrors.confirmEmail = "Emails do not match";
    if (!customer.phone || customer.phone.length < 10)
      tempErrors.phone = "Valid Phone number is required";
    if (!customer.address.trim()) tempErrors.address = "Address is required";
    if (!customer.city.trim()) tempErrors.city = "City is required";
    if (!customer.state.trim()) tempErrors.state = "State is required";
    if (!customer.pincode.trim()) tempErrors.pincode = "Pincode is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /* ---------------- PLACE ORDER ---------------- */
  const placeOrder = async () => {
    if (!validate()) return;
    if (items.length === 0) return alert("Your cart is empty");

    // 🟡 IF COD → OPEN MODAL ONLY
    if (paymentMethod === "cod") {
      setShowCodModal(true);
      return;
    }

    // 🔵 RAZORPAY FLOW
    try {
      setLoading(true);

      const orderRes = await fetch(
        `${API_BASE_URL}/api/orders/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: localStorage.getItem("sessionId"),
            customer,
            paymentMethod,
            items,
            totalAmount,
          }),
        }
      );

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error("Order creation failed");

      navigate("/success", {
        state: { orderId: orderData.orderId, email: customer.email },
      });

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="checkout">
        <div className="checkout-left">
          <h2>Shipping Details</h2>

          <div className="input-group">
            <input name="name" placeholder="Full Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="confirmEmail" placeholder="Confirm Email" onChange={handleChange} />
            <input name="phone" placeholder="Phone" onChange={handleChange} />
            <input name="address" placeholder="Address" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} />
            <input name="state" placeholder="State" onChange={handleChange} />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} />
          </div>

          <div className="payment-method">
            <label>
              <input
                type="radio"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay Online
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

          <button onClick={placeOrder} disabled={loading}>
            {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
          </button>
        </div>

        <div className="checkout-right">
          <h3>Total: ₹{totalAmount}</h3>
        </div>
      </div>

      {/* ✅ COD MODAL CONNECTED */}
      <CodConfirmModal
        open={showCodModal}
        onClose={() => setShowCodModal(false)}
        items={items}
        total={totalAmount}
        customer={customer}
        onOrderCreated={(orderId) => {
          navigate("/success", {
            state: { orderId, email: customer.email },
          });
        }}
      />
    </>
  );
}
