import React, { useState } from "react";
import "./Dashboard.css";
import {
  FaShoppingCart,
  FaRegBookmark,
  FaStar,
  FaFireAlt,
} from "react-icons/fa";
import Stepper from "./Stepper";
import { useCart } from "../CartPage/CartContext";

const Products = ({product}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();


  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    addToCart(product._id, quantity);
  };

  return (
    <div key={product.id} className="productCard">
      <div className="productCard__icons">
        <FaRegBookmark className={"productCard__wishlist"} />
        <FaFireAlt className={"productCard__fastSelling"} />
      </div>
      <img src={product.img} alt="productImage" className="dashboard_productImage" />

      <div className="productCard__content">
        <h3 className="productName">{product.name}</h3>
        <div className="displayStack__1">
          <div className="productPrice">$ {product.price}</div>
          <div className="productCategory">{product.category}</div>
        </div>
        <div className="displayStack__2">
          <div className="productRating">
            {[...Array(product.rating)].map((index) => (
              <FaStar id={index + 1} key={index} className="productRating" />
            ))}
          </div>
          <div className="productDesc">{product.description}</div>
        </div>
        <div className="displayStack__3">
          <Stepper
            initialValue={quantity}
            onValueChange={handleQuantityChange}
          />
          <button className="addToCartButton" onClick={handleAddToCart}>Add to Cart <FaShoppingCart/></button>
        </div>
      </div>
    </div>
  );
};

export default Products;
