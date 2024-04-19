import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState({
    _id: null,
    email: null,
    username: null,
    purchaseHistory: [],
    shippingAddress: null,
  });

  const [productList, setProductList] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProductList(data); // Assuming your API returns an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/login?email=${email}&password=${password}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      setCurrentUser(data.user);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("_id", data.user._id);
      return data.user;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw new Error(error.message);
    }
  };

  const register = async (username, email, password, address) => {
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, address }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setCurrentUser(data);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("_id", data._id);
      return data.user;
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw new Error(error.message);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("_id");
  };

  const fetchHistory = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      return data; // Assuming your API returns the user object
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error; // Re-throw error to allow for handling in components
    }
  };
  const fetchProfile = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      return data; // Assuming your API returns the user object
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error; // Re-throw error to allow for handling in components
    }
  };


  const updateUserInfo = async (userId, updatedInfo) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setCurrentUser(data); // Update currentUser state with the updated user info
      return data;
    } catch (error) {
      console.error("Failed to update user info:", error.message);
      throw new Error(error.message);
    }
  };



  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        fetchProducts,
        productList,
        fetchProfile,
        fetchHistory,
        updateUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
