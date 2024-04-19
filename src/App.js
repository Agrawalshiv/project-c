import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AccountsPage from "./components/AccountsPage/AccountsPage";
import PaymentsPage from "./components/PaymentsPage/PaymentsPage";
import CartPage from "./components/CartPage/CartPage";
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile/:id" element={<AccountsPage />} />
            <Route path="/payment/:bookingId" element={<PaymentsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
