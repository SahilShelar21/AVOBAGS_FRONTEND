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
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import LuxurySplash from "./components/LuxurySplash";
import API_BASE_URL from "./config/api";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Products from "./pages/Products";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import ProductDetails from "./pages/ProductDetails";
import CollectionDetail from "./pages/CollectionDetail";
import AllProducts from "./pages/AllProducts";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";

import { getSessionId } from "./utils/session";

/* ==================================================
   🔁 INNER APP (ROUTER SAFE)
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

  /* 🛒 FETCH CART (AFTER SPLASH) */
  const fetchCart = async () => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/cart?sessionId=${getSessionId()}`
    );

    if (!res.ok) {
      setCartItems([]);
      return;
    }

    const data = await res.json();
    setCartItems(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to fetch cart", err);
    setCartItems([]);
  }
};


  useEffect(() => {
    if (!loading) {
      fetchCart();
    }
  }, [loading]);

  return (
    <>
      {/* 🧳 LUXURY SPLASH */}
      {loading && <LuxurySplash onFinish={() => setLoading(false)} />}

      {/* 🚫 BLOCK APP UNTIL SPLASH ENDS */}
      {!loading && (
        <>
          <Navbar
            cartItems={cartItems}
            onCartClick={() => setIsCartOpen(true)}
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
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  }
                />

                <Route
                  path="/products"
                  element={
                    <PageTransition>
                      <Products />
                    </PageTransition>
                  }
                />

                <Route
                  path="/all-products"
                  element={
                    <PageTransition>
                      <AllProducts />
                    </PageTransition>
                  }
                />

                <Route
                  path="/collection-detail"
                  element={
                    <PageTransition>
                      <CollectionDetail />
                    </PageTransition>
                  }
                />

                <Route
                  path="/new-arrivals"
                  element={
                    <PageTransition>
                      <NewArrivalsPage />
                    </PageTransition>
                  }
                />

                <Route
                  path="/contact"
                  element={
                    <PageTransition>
                      <Contact />
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

                <Route
                  path="/auth"
                  element={
                    <PageTransition>
                      <Auth />
                    </PageTransition>
                  }
                />

                <Route
                  path="/account"
                  element={
                    <PageTransition>
                      <Account />
                    </PageTransition>
                  }
                />

                <Route
                  path="/checkout"
                  element={
                    <PageTransition>
                      <Checkout />
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
   🌍 ROOT WRAPPER
================================================== */
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  );
}
