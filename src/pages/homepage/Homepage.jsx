import axios from "axios";
import Header from "../../components/Header";
import "./homepage.css";
import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { useSearchParams } from "react-router";
const Homepage = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchString = searchParams.get("search");
  const urlPath = searchString ? `?search=${searchString}` : "";
  useEffect(() => {
    axios.get(`/api/products${urlPath}`).then((response) => {
      setProducts(response.data);
    });
  }, [searchString]);

  return (
    <div>
      <title>Ecommerce Project</title>
      <Header cart={cart} />
      <div className="home-page">
        {products.length === 0 ? (
          <div className="products-not-found">NO PRODUCTS FOUND</div>
        ) : (
          <ProductsGrid products={products} loadCart={loadCart} />
        )}
      </div>
    </div>
  );
};

export default Homepage;
