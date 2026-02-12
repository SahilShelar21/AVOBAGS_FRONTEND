import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/order-success.css";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  useEffect(() => {
    launchFireworks();
  }, []);

  const launchFireworks = () => {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: Math.random() * 4 + 1,
        color: `hsl(${Math.random() * 360},100%,50%)`,
        speedX: (Math.random() - 0.5) * 10,
        speedY: (Math.random() - 0.5) * 10,
      });
    }

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
      });

      requestAnimationFrame(animate);
    }

    animate();
  };

  return (
    <div className="success-container">
      <canvas id="fireworks"></canvas>

      <div className="success-card">
        <h1>🎉 Order Successful!</h1>
        <p>Your Order ID: <strong>{orderId}</strong></p>

        <button
          className="track-btn"
          onClick={() => navigate("/my-orders")}
        >
          Track Your Order
        </button>
      </div>
    </div>
  );
}
