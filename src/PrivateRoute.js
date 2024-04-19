import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51P07Xc2KIHEg32T5BJYwWDLLfVQDFWC9FxDAoAHbIWbHtEfZPQZlribf77K8LyYjidoHfCRWBMs7xsM14WM0OGvP00vdw67vEa');

const PrivateRoute = () => {
  const storedAuth = localStorage.getItem("isAuthenticated");
  if (storedAuth === "true") {
    return (
      <Elements stripe={stripePromise}>
        <Outlet />
      </Elements>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
