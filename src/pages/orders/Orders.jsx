import "./orders.css";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import OrdersGrid from "./OrdersGrid";

const Orders = ({ cart, loadCart }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders?expand=products  ").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
};

export default Orders;
