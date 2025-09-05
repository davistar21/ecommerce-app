import { Route, Routes } from "react-router";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./pages/homepage/Homepage";
import Checkout from "./pages/checkout/Checkout";
import Orders from "./pages/orders/Orders";
import Tracking from "./pages/tracking/Tracking";
import PageNotFound from "./pages/404/404";

function App() {
  window.axios = axios; //to put the default values from the backend by running 'axios.post('/api/reset') in the browser console

  const [cart, setCart] = useState([]);
  async function loadCart() {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  }
  useEffect(() => {
    loadCart();
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<Homepage cart={cart} loadCart={loadCart} />} />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/orders"
          element={<Orders cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/tracking/:orderId/:productId"
          element={<Tracking cart={cart} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
