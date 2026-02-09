import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/luxurySplash.css";

export default function LuxurySplash({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 1200); 
    }, 4500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="luxury-splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.7, 0, 0.3, 1] } 
          }}
        >
          <motion.div className="bag-container">
            {/* HANDLE ANIMATION */}
            <motion.div
              className="bag-handle"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />

            {/* BODY ANIMATION */}
            <motion.div
              className="bag-loader"
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Gold Clasp Reveal */}
              <motion.div 
                className="gold-clasp"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              />
            </motion.div>
          </motion.div>

          {/* TEXT CONTENT */}
          <motion.div className="brand-wrapper">
            <motion.h1
              className="loading-text"
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              AVOBAGS
            </motion.h1>
            
            <motion.p 
              className="sub-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              Excellence in Every Stitch
            </motion.p>

            {/* Elegant Minimal Loader */}
            <div style={{ width: '60px', height: '1px', background: '#eee', margin: '20px auto', position: 'relative' }}>
              <motion.div 
                style={{ height: '100%', background: '#0b1c2d', position: 'absolute', left: 0 }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.5, duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}