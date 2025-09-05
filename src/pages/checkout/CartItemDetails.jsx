import axios from "axios";
import formatMoney from "../../utils/money";
import { useEffect, useRef, useState } from "react";
import useEnterKey from "../../hooks/useEnterKey";

const CartItemDetails = ({ cartItem, loadCart }) => {
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const updateInputRef = useRef(null);
  useEffect(() => {
    if (isEditingQuantity && updateInputRef.current) {
      updateInputRef.current.focus();
    }
  }, [isEditingQuantity]);
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  const updateQuantity = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity,
    });
    await loadCart();
    setIsEditingQuantity(false);
  };
  useEnterKey(updateQuantity, isEditingQuantity);
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isEditingQuantity ? (
              <>
                <input
                  ref={updateInputRef}
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value));
                    setQuantity(value);
                  }}
                />
              </>
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={() => {
              setIsEditingQuantity(!isEditingQuantity);
              if (isEditingQuantity === true) {
                updateQuantity();
              }
            }}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
};

export default CartItemDetails;
