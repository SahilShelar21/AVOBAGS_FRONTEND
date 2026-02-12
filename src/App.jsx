import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import UserMenu from "./components/UserMenu";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import LuxurySplash from "./components/LuxurySplash";

import API_BASE_URL from "./config/api";
import { getSessionId } from "./utils/session";

/* Pages */
import Home from "./pages/Home";
import Products from "./pages/Products";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import CollectionDetail from "./pages/CollectionDetail";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Checkouts from "./pages/Checkouts";
import MyOrders from "./pages/MyOrders";
import OrderSuccess from "./pages/OrderSuccess";

/* ==================================================
   🔁 INNER APP
================================================== */
function App() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* 🔒 LOCK SCROLL DURING SPLASH */
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  /* 🛒 FETCH CART (User OR Guest) */
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = `${API_BASE_URL}/api/cart`;

      // Logged-in user cart
      if (token) {
        const res = await fetch(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setCartItems([]);
          return;
        }

        const data = await res.json();
        setCartItems(Array.isArray(data) ? data : []);
      }

      // Guest cart
      else {
        const res = await fetch(
          `${baseUrl}?sessionId=${getSessionId()}`
        );

        if (!res.ok) {
          setCartItems([]);
          return;
        }

        const data = await res.json();
        setCartItems(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch cart", err);
      setCartItems([]);
    }
  };

  /* Load cart after splash */
  useEffect(() => {
    if (!loading) fetchCart();
  }, [loading]);

  return (
    <>
      {loading && <LuxurySplash onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          <Navbar
            cartItems={cartItems}
            onCartClick={() => setIsCartOpen(true)}
          />

          <UserMenu
            onLogout={() => {
              localStorage.removeItem("token");
              setCartItems([]);      // Clear cart
              setIsCartOpen(false);  // Close drawer
            }}
          />

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            setCartItems={setCartItems}
            fetchCart={fetchCart}
          />

          <div style={{ marginTop: "77px" }}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
                <Route path="/all-products" element={<PageTransition><AllProducts /></PageTransition>} />
                <Route path="/collection-detail" element={<PageTransition><CollectionDetail /></PageTransition>} />
                <Route path="/new-arrivals" element={<PageTransition><NewArrivalsPage /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
                <Route path="/account" element={<PageTransition><Account /></PageTransition>} />
                <Route path="/my-orders" element={<PageTransition><MyOrders /></PageTransition>} />
                <Route path="/success" element={<OrderSuccess />} />

                <Route
                  path="/checkouts"
                  element={
                    <PageTransition>
                      <Checkouts />
                    </PageTransition>
                  }
                />

                <Route
                  path="/product/:slug"
                  element={
                    <PageTransition>
                      <ProductDetails
                        fetchCart={fetchCart}
                        openCart={() => setIsCartOpen(true)}
                      />
                    </PageTransition>
                  }
                />
              </Routes>
            </AnimatePresence>
          </div>
        </>
      )}
    </>
  );
}

/* ==================================================
   🌍 ROOT WRAPPER (DEFAULT EXPORT)
================================================== */
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  );
}
