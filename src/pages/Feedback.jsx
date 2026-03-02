import { useState } from "react";
import "../styles/static-pages.css";

export default function Feedback() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback! We'll review it shortly.");
    setMessage("");
  };

  return (
    <div className="static-page">
      <div className="static-container">
        <h1>Share Your Feedback</h1>
        <p>How was your experience with Avo Bags? We value your thoughts.</p>
        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            rows="6"
            placeholder="Tell us what you loved or what we can improve..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit" className="static-btn">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}