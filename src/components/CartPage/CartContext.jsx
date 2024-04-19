import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const user_id = localStorage.getItem("_id");

  const initialCart = {
    user: user_id,
    items: [],
  };
  const [cart, setCart] = useState(initialCart);

  const getCart = async () => {
    const userId = localStorage.getItem("_id");

    try {
      const response = await fetch(
        `http://localhost:8080/api/carts?userId=${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Cart update failed");
      }

      const updatedCartData = await response.json();
      console.log(updatedCartData);
      setCart(updatedCartData == [] ? initialCart : updatedCartData);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const createCart = async () => {
    try {
      const userId = localStorage.getItem("_id");
      const response = await fetch(
        `http://localhost:8080/api/carts?userId=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Cart update failed");
      }

      const updatedCartData = await response.json();
      setCart(updatedCartData);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const addToCart = async (product, quantity) => {
    const userId = localStorage.getItem("_id");

    const itemIndex = cart.items.findIndex((item) => item.product === product);

    let updatedCart;
    if (itemIndex !== -1) {
      const updatedCartItem = cart.items.map((item) =>
        item.product === product
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      updatedCart = {
        items: updatedCartItem,
        user: userId,
      }
    } else {
      updatedCart = {
        items: [...cart.items, { product: product, quantity }],
        user: userId,
      };
    }

    console.log(updatedCart);

    try {
      const response = await fetch(
        `http://localhost:8080/api/carts?userId=${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCart),
        }
      );

      if (!response.ok) {
        throw new Error("Cart update failed");
      }

      const updatedCartData = await response.json();
      setCart(updatedCartData);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    const userId = localStorage.getItem("_id");
    const updatedCartItems = cart.items.filter(
      (item) => item.product !== productId
    );
    const updatedCart = { ...cart, items: updatedCartItems };
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts?userId=${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCart),
        }
      );

      if (!response.ok) {
        throw new Error("Cart update failed");
      }

      const updatedCartData = await response.json();
      console.log(updatedCartData);

      setCart(updatedCartData);
    } catch (error) {
      console.error("Error updating cart:", error);
      // Handle the error
    }
  };

  const getProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Cart update failed");
      }

      const product = await response.json();
      return product;
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getProduct,
        addToCart,
        removeFromCart,
        getCart,
        createCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
