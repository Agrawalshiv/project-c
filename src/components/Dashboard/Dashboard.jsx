import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Products from "./Products";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../../authentication";
import Loading from "../Loading/Loading";

const Dashboard = () => {
  const { fetchProducts, productList } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cartCreated, setCartCreated] = useState(false);

  useEffect(() => {
    fetchProducts();
    setLoading(false);
  }, []);


  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboardWrapper">
      <Navbar isBack={false} />
      <div className="productsWrapper">
        {productList.map((data) => (
          <Products key={data._id} product={data} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
