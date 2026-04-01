import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { FoodListContext } from "../../context/FoodListContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { AddressForm } from "../AddressForm";
import { handleCheckout } from "../HandleCheckout";
import { OrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Checkout = () => {
  const { state, dispatch } = useContext(FoodListContext);
  const { setOrder } = useContext(OrderContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalPrice = state.cart.reduce(
    (acc, curr) => acc + Number(curr.price * curr.qty),
    0
  );

  const totalItems = state.cart.reduce((acc, curr) => acc + curr.qty, 0);

  const totalCheckoutPrice = totalPrice + 100;

  const handlePlaceOrder = async () => {
    const selectedAddress = state.addresses.find(
      (address) => address.id === state.selectedAddressId
    );

    if (selectedAddress) {
      try {
        const orderData = await handleCheckout(
          selectedAddress,
          totalCheckoutPrice,
          state.cart,
          token
        );
        setOrder(orderData);
        dispatch({ type: "CLEAR_CART" });
        navigate("/profile/order-history");
      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("An error occurred during checkout.");
      }
    } else {
      toast.error("Please select an address before placing the order.");
    }
  };

  return (
    <div className="topToBody checkout-outer-container">
      <div className="checkout-address-container">
        <h3 className="text-align-center">Address Details</h3>

        {state.addresses.map((details) => {
          const { id, name, phone, addressText, profileState } = details;

          return (
            <div className="checkout-address-box">
              <input
                type="radio"
                name="address-radio"
                checked={id === state.selectedAddressId}
                onChange={() =>
                  dispatch({ type: "SELECT_ADDRESS", payload: id })
                }
              />

              <label htmlFor="" className="address-label">
                <h3>{name}</h3>
                <p>
                  {addressText},{profileState}
                </p>
                <p>
                  <span>Mobile:</span>
                  {phone}
                </p>
              </label>
            </div>
          );
        })}
        <div className="checkout-controller-container">
          {state.isAdded ? (
            <div className="add-address-outer-container">
              <div className="add-address-container">
                <AddressForm
                  details={{
                    id: uuid(),
                    name: "",
                    phone: "",
                    city: "",
                    pin: "",
                    profileState: "",
                    addressText: "",
                  }}
                />
              </div>
            </div>
          ) : (
            <button
              className="add-address-btn"
              onClick={() => dispatch({ type: "ADD_ADDRESS_BUTTON_CLICKED" })}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
          {!state.isAdded && (
            <p className="add-address-label">Add new Address</p>
          )}
        </div>
      </div>

      <div className="checkout-box-container">
        <div className="checkout-box">
          <h3 className="text-align-center">Order Details</h3>

          <hr className="cart-price-details-hr" />
          <div>
            <li>
              <ul className="order-header">
                <p>Item</p>
                <p>Qty</p>
              </ul>
            </li>
            <li>
              {state.cart.map(({ _id, title, qty }) => (
                <ul key={_id}>
                  <p>{title}</p>
                  <p>{qty}</p>
                </ul>
              ))}
            </li>
          </div>
          <h4 className="text-align-center border-header">Price Details</h4>
          <div className="checkout-calculate">
            <li>
              <ul>
                <p>Price ({totalItems} items)</p>
                <p>₹ {totalPrice}</p>
              </ul>
              <ul>
                <p>Delivery Charges</p>
                <p>₹100</p>
              </ul>
            </li>
          </div>
          <ul>
            <h4>Total Amount</h4>
            <h4>₹ {totalCheckoutPrice}</h4>
          </ul>
          <h4 className="text-align-center border-header">Deliver To</h4>
          <div className="deliver-container">
            {state.addresses.map(({ id, name, phone, addressText }) => {
              const isSelectedAddress = state.selectedAddressId === id;
              if (isSelectedAddress) {
                return (
                  <div key={id}>
                    <p className="paragraph-md">{name}</p>
                    <p className="paragraph-sm">{addressText}</p>
                    <p className="paragraph-sm">Phone Number: {phone}</p>
                  </div>
                );
              }
              return null;
            })}
            {state.selectedAddressId === null && (
              <h4>Enter Address for Delivery</h4>
            )}
          </div>
          <div className="text-center">
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};
