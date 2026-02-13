import { useEffect, useState } from "react";
import axios from "axios";

const OrderSuccess = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`);
        setOrder(res.data.order);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Successful!</h2>
      <p>Order ID: {order.id}</p>
      <p>Payment ID: {order.razorpay_payment_id}</p>
      <p>Total Amount: ₹{order.total_amount}</p>
      <p>Status: {order.payment_status}</p>
      <h3>Shipping Details:</h3>
      <p>{order.name}</p>
      <p>{order.address}, {order.city}, {order.state} - {order.pincode}</p>
    </div>
  );
};

export default OrderSuccess;
