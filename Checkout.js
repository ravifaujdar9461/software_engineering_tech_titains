// feat: implement checkout functionality with address selection and order processing
// - Integrated cart data and order context for managing checkout flow
// - Added address selection and dynamic address form handling
// - Implemented total price, item count, and delivery charge calculation
// - Integrated order placement with API handling and navigation
// - Included toast notifications for error handling and user feedback

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

// feat: create Checkout component to manage order placement process
// - Handles address selection, cart summary, and final order submission

export const Checkout = () => {
  const { state, dispatch } = useContext(FoodListContext); // global cart & address state
  const { setOrder } = useContext(OrderContext); // order state management
  const { token } = useContext(AuthContext); // authentication token
  const navigate = useNavigate(); // navigation handler

  // feat: calculate total price of items in cart
  const totalPrice = state.cart.reduce(
    (acc, curr) => acc + Number(curr.price * curr.qty),
    0
  );

  // feat: calculate total number of items
  const totalItems = state.cart.reduce((acc, curr) => acc + curr.qty, 0);

  // feat: include delivery charges in final amount
  const totalCheckoutPrice = totalPrice + 100;

  // feat: handle order placement logic
  // - Validates selected address
  // - Calls checkout handler for order processing
  // - Clears cart and redirects to order history page

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

        setOrder(orderData); // store order details
        dispatch({ type: "CLEAR_CART" }); // clear cart after order
        navigate("/profile/order-history"); // redirect to order history

      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("An error occurred during checkout."); // error notification
      }
    } else {
      toast.error("Please select an address before placing the order."); // validation error
    }
  };

  return (
    <div className="topToBody checkout-outer-container">

      {/* feat: display and select user addresses */}
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

        {/* feat: add new address functionality */}
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

      {/* feat: display order summary and pricing details */}
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

            {/* feat: list all cart items in order summary */}
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

          {/* feat: display pricing breakdown */}
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

          {/* feat: display total checkout amount */}
          <ul>
            <h4>Total Amount</h4>
            <h4>₹ {totalCheckoutPrice}</h4>
          </ul>

          {/* feat: display selected delivery address */}
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

          {/* feat: place order button */}
          <div className="text-center">
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};