import React, { useState } from "react";
import "./Navbar.css";
import { useAuth } from "../../authentication";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { useCart } from "../CartPage/CartContext";

const Navbar = ({ isBack }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { createCart } = useCart();

  const userId = localStorage.getItem("_id");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleCartClick = async () => {
    try {
      await createCart();
      navigate("/cart");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleBrandClick = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <nav>
      {isBack == true ? (
        <div onClick={handleGoBack}>
          <IoArrowBack className="backButton" />
        </div>
      ) : (
        <></>
      )}
      <h2 className="brand" onClick={handleBrandClick}>
        HardStore
      </h2>
      <div className="actionButtons">
        <p className="link cartLink" onClick={handleCartClick}>
          <FaShoppingCart />
        </p>
        <Link className="link profileLink" to={`/profile/${userId}`}>
          <FaUser />
        </Link>
        <p className="link" onClick={handleLogout}>
          <RiLogoutBoxRFill />
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
