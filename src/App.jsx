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
   🔁 INNER APP (SAFE TO USE ROUTER HOOKS)
================================================== */
function App() {
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/cart?sessionId=${getSessionId()}`
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
    fetchCart();
  }, []);

  return (
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
