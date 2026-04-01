import React, { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import "../OrderHistory.css";

export const OrderHistroy = () => {
  const { order } = useContext(OrderContext);

  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();
  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

  const { paymentId, products, selectedAddress, totalPrice } = order;

  return (
    <div className="order-outer-container">
      {!order ? (
        <div className="order-placeholder-container">
          <h3>No order to display</h3>
        </div>
      ) : (
        <div className="order-item-container">
          <div className="order-item-left">
            <p>
              Payment id:{" "}
              <span className="">
                <span>{paymentId}</span>
              </span>
            </p>
            <p>Total Amount: {totalPrice}</p>
            <p>Ordered Date: {currentDate}</p>
            <p>Order will be delivered within 30 minutes</p>
            <p>Order Address:</p>
            <span>
              {selectedAddress.addressText}, {selectedAddress.city},{" "}
              {selectedAddress.profileState}
            </span>
            <p>
              Mobile: <span>{selectedAddress.phone}</span> Pin:{" "}
              <span>{selectedAddress.pin}</span>
            </p>
          </div>
          <div className="order-item-right">
            {products.map(({ _id, title, url, price, qty, restaurant }) => (
              <div className="card-container card-container-hz" key={_id}>
                <div className="card-img-container-hz cart-card-img-container">
                  <img className="card-img" src={url} alt="" />
                </div>
                <div className="card-content">
                  <div className="cart_mngmt-card-container">
                    <div className="cart_mngmt-card-item">
                      <h4>{title}</h4>
                    </div>
                    <div className="cart_mngmt-card-item">
                      <p>₹ {price}</p>
                    </div>
                    <div className="cart_mngmt-card-item">
                      <h4>Quantity: {qty}</h4>
                    </div>
                    <div className="cart_mngmt-card-item">
                      <p>
                        <b>Restaurant:</b> {restaurant}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
