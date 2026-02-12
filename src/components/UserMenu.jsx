import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import "../styles/userMenu.css";

export default function UserMenu({ onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (!isLoggedIn()) {
      navigate("/auth");
    } else {
      setOpen(!open);
    }
  };

  const handleLogout = () => {
    logout();              // remove token
    onLogout?.();          // clear cart from parent
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-icon" onClick={handleUserClick}>
        👤
      </button>

      {open && isLoggedIn() && (
        <div className="dropdown">
          <div
            className="dropdown-item"
            onClick={() => {
              navigate("/my-orders");
              setOpen(false);
            }}
          >
            My Orders
          </div>

          <div
            className="dropdown-item logout"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
