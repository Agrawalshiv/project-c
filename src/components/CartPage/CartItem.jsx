import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { useCart } from "./CartContext";
import Loading from "../Loading/Loading";

const CartItem = ({ item, removeFromCart }) => {

  const handleRemoveClick = () => {
    removeFromCart(item.product);
  };

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { getProduct } = useCart();

  useEffect(() => {
    getProduct(item.product).then((product) => {
      setProduct(product);
      setLoading(false);
    });
  }, [item]);

  if(loading){
    return <Loading/>;
  }

  return (
    <div className="cartItem">
      <img src={product.img} alt={product.name} className="productImage" />
      <div className="cartItemInfo">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <button onClick={handleRemoveClick}>Remove</button>
    </div>
  );
};

export default CartItem;
