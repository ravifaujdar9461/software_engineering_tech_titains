/*feat: implement cart page with dynamic state management and pricing logic
** Integrated React Context API for global cart state handling
** Added functionality to display cart items with quantity controls
** Implemented total price calculation based on item quantity
** Included wishlist integration and item removal feature
** Added conditional rendering for empty cart UI*/

import React, { useContext } from "react";
import { FoodListContext } from "../../context/FoodListContext";
import { AddToWishList } from "../AddToWishList";
import { RemoveFromCart } from "./RemoveFromCart";
import { Link } from "react-router-dom";
import emptyCart from "../../images/empty-cart.gif";
import { ToastContainer } from "react-toastify";

// feat: create Cart component to manage and display user cart data
//  Retrieves cart state using useContext
//  Provides UI for modifying quantity and removing items
//  Displays total price and checkout option

export const Cart = () => {
  const { state, dispatch } = useContext(FoodListContext); // access global state

  console.log(state.cart);

  // feat: calculate total cart price dynamically
  //  Multiplies price with quantity for each item
  // Aggregates total using reduce function

  const totalPrice = state.cart.reduce(
    (acc, curr) => acc + Number(curr.price * curr.qty),
    0
  );

  return (
    <>
      <ToastContainer />

      {/* feat: conditional rendering for empty cart */}
      {state.cart.length === 0 ? (
        <div className="topToBody empty-cart">
          <img src={emptyCart} alt="" />
          <h1>Your Cart is Empty</h1>
        </div>
      ) : (
        <div className="topToBody cart-container">
          <div className="cart-container-header">
            <h3>MY CART ({state?.cart?.length})</h3>
          </div>

          <div className="all-cart-cards">
            <div className="cart-card">

              {/* feat: render cart items dynamically */}
              {state?.cart?.map((product) => {
                const { _id, title, price, url, qty } = product;

                return (
                  <div className="cart-content" key={_id}>
                    <div className="image-container">
                      <img src={url} alt="imageCart" />

                      {/* feat: integrate wishlist functionality */}
                      <div className="wishlist-container">
                        <AddToWishList product={product} />
                      </div>
                    </div>

                    <div className="cart-item-information">
                      <div className="cart-item-information-container">
                        <h3>{title}</h3>
                        <p className="price">{price}</p>
                        <p>40% OFF</p>

                        {/* feat: quantity control using dispatch actions */}
                        <div className="quantity">
                          <p>Quantity: </p>
                          <div className="quantity-btn">
                            <button
                              disabled={qty === 1}
                              className={qty === 1 && "decrement-button"}
                              onClick={() =>
                                dispatch({
                                  type: "DECREMENT_QUANTITY",
                                  payload: _id,
                                })
                              }
                            >
                              -
                            </button>

                            <p className="cart-quantity-number">{qty}</p>

                            <button
                              onClick={() =>
                                dispatch({
                                  type: "INCREMENT_QUANTITY",
                                  payload: _id,
                                })
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* feat: remove item from cart */}
                      <RemoveFromCart product={product} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* feat: display cart price breakdown */}
            <div className="cart-price-details">
              <h4>CART PRICE DETAILS</h4>
              <hr className="cart-price-details-hr" />

              {state.cart.map(({ _id, title, price, qty }) => (
                <div className="cart-price-item" key={_id}>
                  <p>
                    {title} ({qty})
                  </p>
                  <p className="price">{price * qty}</p>
                </div>
              ))}

              {/* feat: display total price */}
              <div className="cart-price-item">
                <p>
                  <b>Total Price:</b>
                </p>
                <p className="price">
                  <b>{totalPrice}</b>
                </p>
              </div>

              {/* feat: checkout navigation */}
              <div className="checkout-button">
                <Link to="/checkout">
                  <button>CHECKOUT</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};