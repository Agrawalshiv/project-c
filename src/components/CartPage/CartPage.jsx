import React, { useEffect } from "react";
import { useCart } from "./CartContext";
import CartItem from "./CartItem";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, getCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);


  const handleCheckout = ()=>{
    navigate('/checkout', {state: cart})
  }

  return (
    <>
      <Navbar isBack={true} />
      <div className="cartPage">
        <h2>Shopping Cart</h2>
        {cart.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cartItems">
            {cart.items.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                removeFromCart={removeFromCart}
              />
            ))}
            <div onClick={handleCheckout} className="checkout">
              Checkout
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
