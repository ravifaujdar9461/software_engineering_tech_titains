import React, { useContext } from "react";
import deliverySlider from "../images/delivery-slider.png";
import { Link } from "react-router-dom";
import { FoodListContext } from "../context/FoodListContext";

export const PageInformation = () => {
  const { dispatch } = useContext(FoodListContext);
  return (
    <div className="home-page">
      <img src={deliverySlider} alt="" />
      <div className="landing-page-content">
        <h1>"Delivering deliciousness to your doorstep!!!" </h1>
        <p>
          Hungry? Don't worry, we've got you covered. With FoodEase, the
          ultimate food delivery app, your taste buds are in for a treat.
        </p>
        <button
          onClick={() =>
            dispatch({ type: "ON_CLICKING_CATEGORY", payload: "" })
          }
        >
          <Link to="/foodItems" style={{ textDecoration: "none" }}>
            I'm Hungry
          </Link>
        </button>
      </div>
    </div>
  );
};

//Go to cart: #2da76e
