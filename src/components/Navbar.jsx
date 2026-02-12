import { NavLink, Link } from "react-router-dom";
import logo from "../assets/bags/avobags_logo.png";
import UserMenu from "./UserMenu"; // ✅ ADD THIS

export default function Navbar({ cartItems = [], onCartClick }) {
  const safeCart = Array.isArray(cartItems) ? cartItems : [];
  const cartCount = safeCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header style={styles.header}>
      {/* Left: Logo */}
      <Link to="/" style={styles.logoWrap}>
        <img src={logo} alt="AvoBags" style={{ height: 40 }} />
      </Link>

      {/* Center: Menu */}
      <nav style={styles.nav}>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.active } : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/all-products"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.active } : styles.link
          }
        >
          Product
        </NavLink>

        <NavLink
          to="/contact"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.active } : styles.link
          }
        >
          Contact Us
        </NavLink>
      </nav>

      {/* Right Icons */}
      <div style={styles.icons}>
        {/* ✅ USER MENU DROPDOWN */}
        <UserMenu />

        {/* CART ICON */}
        <div style={{ position: "relative" }}>
          <div
            style={styles.iconCircle}
            onClick={onCartClick}
            title="Cart"
          >
            👜
          </div>

          {cartCount > 0 && (
            <span style={styles.badge}>{cartCount}</span>
          )}
        </div>
      </div>
    </header>
  );
}

/* ✅ STYLES (UNCHANGED) */
const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: "77.53px",
    background: "#fff",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    padding: "0 80px",
    boxSizing: "border-box",
    fontFamily: "'Poppins', sans-serif",
    borderBottom: "1px solid #f3f4f6",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    fontSize: "15px",
  },
  link: {
    cursor: "pointer",
    color: "#6b7280",
    fontWeight: 500,
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
  active: {
    color: "#000",
    fontWeight: 600,
  },
  icons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "18px",
    alignItems: "center",
  },
  iconCircle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "16px",
    transition: "transform 0.2s ease",
  },
  badge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    background: "#111",
    color: "#fff",
    fontSize: "11px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
