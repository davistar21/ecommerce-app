import { NavLink, useNavigate } from "react-router";
import "./header.css";
import { useState } from "react";
import useEnterKey from "../hooks/useEnterKey";
const Header = ({ cart }) => {
  const [searchString, setSearchString] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const search = () => {
    if (searchString && searchString.trim().length > 0) {
      navigate(`?search=${searchString}`);
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
      setSearchString("");
    }
  };
  useEnterKey(search, isSearching);
  let totalQuantity = 0;
  cart &&
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src="images/logo-white.png" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />

        <button className="search-button" onClick={search}>
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
