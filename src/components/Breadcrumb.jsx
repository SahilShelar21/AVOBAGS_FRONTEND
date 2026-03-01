import { Link } from "react-router-dom";
import "../styles/breadcrumb.css";

export default function Breadcrumb({ current, items }) {
  // If items array is provided, use it for multi-level breadcrumb
  if (items) {
    return (
      <nav className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        {items.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="breadcrumb-separator">›</span>
            {item.link ? (
              <Link to={item.link} className="breadcrumb-link">{item.name}</Link>
            ) : (
              <span className="breadcrumb-current">{item.name}</span>
            )}
          </div>
        ))}
      </nav>
    );
  }

  // Original single-level breadcrumb
  return (
    <nav className="breadcrumb">
      <Link to="/" className="breadcrumb-link">Home</Link>
      <span className="breadcrumb-separator">›</span>
      <span className="breadcrumb-current">{current}</span>
    </nav>
  );
} 
