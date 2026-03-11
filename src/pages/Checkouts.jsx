import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/checkouts.css";
import API_BASE_URL from "../config/api";
import CodConfirmModal from "../components/CodConfirmModal";

/* -------- ALL INDIA STATES -------- */
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

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
    phone: "",
    address: "",
    city: "",
    district: "",
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
    if (!/^\d{10}$/.test(customer.phone))
      temp.phone = "Valid 10-digit phone required";
    if (!customer.address.trim()) temp.address = "Address required";
    if (!customer.city.trim()) temp.city = "City required";
    if (!customer.district.trim()) temp.district = "District required";
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

    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      alert("Razorpay Key Missing in Frontend ENV");
      return;
    }

    try {
      setLoading(true);

      const createRes = await fetch(`${API_BASE_URL}/api/orders/create-razorpay-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          items: items.map((it) => it.name),
        }),
      });

      if (!createRes.ok) throw new Error("Failed to create Razorpay order");
      const createData = await createRes.json();
      const order_id = createData.id || createData.order_id || createData._id;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: "AVOBAGS",
        description: "Secure Order Payment",
        order_id,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        theme: { color: "#0b1c2d" },

        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/api/orders/verify-payment`, {
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
                  district: customer.district,
                  state: customer.state,
                  pincode: customer.pincode,
                  total_amount: totalAmount,
                  session_id: Date.now().toString(),
                  items: items.map((it) => ({
                    productId: it.product_id || it.productId,
                    name: it.name,
                    price: it.price,
                    quantity: it.quantity,
                    image: it.image || it.image_url || it.imageUrl || null,
                  })),
                },
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.message || "Verification failed");
            }

            navigate("/order-success", {
              state: { orderId: verifyData.order.id, waLink: verifyData.waLink },
              replace: true,
            });
          } catch (err) {
            console.error("Verification Error:", err);
            alert("Payment verification failed. Please contact support.");
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Init Error:", err);
      alert("Payment initialization failed.");
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

            <div className="full-width">
              <label>Full Name *</label>
              <input
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div>
              <label>Email *</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div>
              <label>Phone *</label>
              <input
                name="phone"
                type="tel"
                placeholder="10-digit phone"
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
                maxLength="10"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="full-width">
              <label>Address *</label>
              <input
                name="address"
                placeholder="Street address"
                onChange={handleChange}
                className={errors.address ? "error" : ""}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div>
              <label>City *</label>
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                className={errors.city ? "error" : ""}
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            <div>
              <label>District *</label>
              <input
                name="district"
                placeholder="District"
                onChange={handleChange}
                className={errors.district ? "error" : ""}
              />
              {errors.district && <span className="error-text">{errors.district}</span>}
            </div>

            <div>
              <label>State *</label>
              <select
                name="state"
                onChange={handleChange}
                className={errors.state ? "error" : ""}
                defaultValue=""
              >
                <option value="" disabled>Select State</option>
                {indianStates.map((state, i) => (
                  <option key={i} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <span className="error-text">{errors.state}</span>}
            </div>

            <div>
              <label>Pincode *</label>
              <input
                name="pincode"
                placeholder="6-digit pincode"
                onChange={handleChange}
                className={errors.pincode ? "error" : ""}
                maxLength="6"
              />
              {errors.pincode && <span className="error-text">{errors.pincode}</span>}
            </div>

          </div>

          <div className="payment-method">
            <h4>Payment Method</h4>

            <label className="payment-option">
              <input
                type="radio"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay Online (Razorpay)
            </label>

            <label className="payment-option">
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

          {items.map((item, index) => (
            <div key={index} className="summary-item">
              <span>{item.name} × {item.quantity}</span>
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