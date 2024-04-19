import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../CartPage/CartContext";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [total, setTotal] = useState(0);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const { getProduct } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state;
  const userId = localStorage.getItem("_id");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    setProcessing(false);

    if (error) {
      setError(error.message);
    } else {
      console.log("Success! Payment Method:", paymentMethod);
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.items,
          user: userId,
          paymentId: paymentMethod.id,
          totalPrice: total,
        }),
      });
      setError("");
      navigate("/");
    }
  };

  useEffect(() => {
    const calculateTotal = async () => {
      try {
        var totalDump = 0;
        cart.items.forEach(async (item) => {
          const product = await getProduct(item.product);

          totalDump += (product.price * item.quantity);

          setTotal(totalDump.toFixed(2));
        });
      } catch (error) {
        console.log("Error fetching product: ", error);
      }
    };

    calculateTotal();
  }, [cart]);

  return (
    <div className="checkout-form-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="totalPrice">Total: ${total}</div>
        <div className="form-group">
          <label htmlFor="card-element">Card Details</label>
          <CardElement id="card-element" />
        </div>
        <button type="submit" disabled={processing}>
          {processing ? "Processing..." : "Pay Now"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Checkout;
