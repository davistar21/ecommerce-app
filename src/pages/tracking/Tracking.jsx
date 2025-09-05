import { Link, useParams } from "react-router";
import Header from "../../components/Header";
import "./tracking.css";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
const Tracking = ({ cart }) => {
  const params = useParams();
  const { orderId, productId } = params;
  const [trackedPackage, setTrackedPackage] = useState(null);
  const [order, setOrder] = useState({});

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`api/orders/${orderId}?expand=products`);
      const pkg = response.data.products.find((e) => e.productId === productId);

      setOrder(response.data);
      setTrackedPackage(pkg);
    }
    getData();
  }, []);

  return (
    <>
      <Header cart={cart} />
      <div className="tracking-page">
        {trackedPackage && (
          <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>

            <div className="delivery-date">
              Arriving on{" "}
              {dayjs(trackedPackage.estimatedDeliveryTimeMs).format(
                "dddd, MMMM D"
              )}
            </div>

            <div className="product-info">{trackedPackage.product.name}</div>

            <div className="product-info">
              Quantity: {trackedPackage.quantity}
            </div>

            <img className="product-image" src={trackedPackage.product.image} />

            <div className="progress-labels-container">
              <div className="progress-label">Preparing</div>
              <div className="progress-label current-status">Shipped</div>
              <div className="progress-label">Delivered</div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tracking;
