import React, { useEffect, useState } from "react";
import { useCart } from "../CartPage/CartContext";
import "./HistoryElement.css";

const HistoryElement = ({ history }) => {
  const { getProduct } = useCart();
  const [productsData, setProductsData] = useState([]);
  const [formattedOrderDate, setFormattedOrderDate] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const updatedProductsData = [];
      for (const item of history.items) {
        const data = await getProduct(item.product);
        updatedProductsData.push({ product: data, quantity: item.quantity });
      }
      setProductsData(updatedProductsData);
    };

    fetchProducts();

    // Format order date
    const orderDate = new Date(history.orderDate);
    const formattedDate = orderDate.toLocaleDateString();
    setFormattedOrderDate(formattedDate);
  }, [history.items, history.orderDate, getProduct]);

  return (
    <div className="eachHistoryElement">
      {productsData.map((productData, index) => (
        <div className="historyProduct" key={index}>
          <img
            className="historyProductImage"
            src={productData.product.img}
            alt=""
          />
          <div className="dataColumn">
            <b className="productName">{productData.product.name}</b>
            <p className="productPrice">
              <b>Price At:</b> ${productData.product.price}
            </p>
            <p className="productQuantity">
              <b>Quantity:</b> {productData.quantity}
            </p>
          </div>
        </div>
      ))}
      <div className="dataRow">
        <div className="purchaseDate">Date: {formattedOrderDate}</div>
        <div className="historyTotalPrice">
          Total Price: ${history.totalPrice}
        </div>
      </div>
    </div>
  );
};

export default HistoryElement;
