import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import hero_bag from "../assets/hero_bag.png";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Auth = () => {
  const navigate = useNavigate(); // ✅ MOVED INSIDE COMPONENT

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    identifier: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  /* ===============================
     VALIDATION
  =============================== */
  const validate = () => {
    const err = {};

    if (!isLogin) {
      if (!form.name.trim()) err.name = "Name is required";

      if (!/^\S+@\S+\.\S+$/.test(form.email))
        err.email = "Enter a valid email";

      if (!/^[6-9]\d{9}$/.test(form.phone))
        err.phone = "Enter valid 10-digit mobile number";
    }

    if (isLogin && !form.identifier.trim())
      err.identifier = "Email or mobile required";

    if (!form.password || form.password.length < 6)
      err.password = "Password must be at least 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = async () => {
    setServerError("");
    if (!validate()) return;

    const url = isLogin
      ? `${API_BASE_URL}/api/auth/login`
      : `${API_BASE_URL}/api/auth/signup`;

    const body = isLogin
      ? { identifier: form.identifier, password: form.password }
      : {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error response:", text);
        setServerError("Server error occurred");
        return;
      }

      let data;

      try {
        data = await res.json();
      } catch (err) {
        console.error("Invalid JSON returned from server");
        setServerError("Server returned invalid response");
        return;
      }

      console.log("Auth Response:", data);

      if (!data.success) {
        setServerError(data.error || "Something went wrong");
        return;
      }

      // ✅ SAVE TOKEN + USER
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        const token = data.token;
        const guestCart =
          JSON.parse(localStorage.getItem("guestCart")) || [];

        // ✅ MERGE GUEST CART
        if (guestCart.length > 0) {
          for (const item of guestCart) {
            await fetch(`${API_BASE_URL}/api/cart/add`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                productId: item.id,
                quantity: item.quantity,
              }),
            });
          }

          localStorage.removeItem("guestCart");
        }
      }

      // ✅ REDIRECT AFTER SUCCESS
      navigate("/account");

    } catch (err) {
      console.error("Auth error:", err);
      setServerError("Unable to connect to server");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* LEFT PANEL */}
        <div className="auth-left">
          <div>
            <h2>Login & Signup</h2>
            <p>Your journey begins here.</p>
          </div>
          <img src={hero_bag} alt="Bag" />
          <span>avobags.com</span>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">

          {/* TABS */}
          <div className={`auth-tabs ${!isLogin ? "signup" : ""}`}>
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>

            <div className="underline"></div>
          </div>

          {/* FORM */}
          <div className="auth-form">

            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </>
            )}

            {isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Email or Mobile"
                  onChange={(e) =>
                    setForm({ ...form, identifier: e.target.value })
                  }
                />
                {errors.identifier && (
                  <p className="error">{errors.identifier}</p>
                )}
              </>
            )}

            <div className="password-wrap">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              <span>👁</span>
            </div>

            {errors.password && <p className="error">{errors.password}</p>}
            {serverError && <p className="error center">{serverError}</p>}

            <button className="auth-btn" onClick={handleSubmit}>
              {isLogin ? "Login" : "Create Account"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
