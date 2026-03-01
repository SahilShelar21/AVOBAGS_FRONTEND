import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/luxurySplash.css";
import logo from "../assets/bags/avobags_logo.png"; 

export default function LuxurySplash({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 1000); 
    }, 5000); 
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
        >
          <div className="logo-wrapper">
            {/* STAGE 1 & 2: The Letter and Border Reveal */}
            {/* We use clip-path to show the center first, then expand to the edges */}
            <motion.img
              src={logo}
              alt="AVO BAGS"
              className="splash-logo-reveal"
              initial={{ clipPath: "inset(30% 20% 30% 20%)", opacity: 0 }}
              animate={{ 
                clipPath: "inset(0% 0% 0% 0%)", 
                opacity: 1 
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut",
                delay: 0.5 
              }}
            />

            {/* STAGE 3: The "Pop" - A second layer that scales up */}
            <motion.img
              src={logo}
              className="logo-pop-layer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 2.2, 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100 
              }}
            />
          </div>

          <motion.p 
            className="tagline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Excellence in Every Stitch
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}