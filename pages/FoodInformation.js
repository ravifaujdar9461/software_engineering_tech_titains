import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { FoodListContext } from "../../context/FoodListContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { AddToWishList } from "../AddToWishList";
import { AddToCart } from "../AddToCart";

export const FoodInformation = () => {
  const { state } = useContext(FoodListContext);

  const { id } = useParams();

  const foodInformation = state.foodList.find(({ _id }) => id === _id);
  console.log(foodInformation);

  return (
    <div className="topToBody productlist-container">
      <div className="product-details-main">
        <div className="product-details-image">
          <img src={foodInformation.url} alt="" />
          <div className="wishlist-container">
            <div className="food-content-wishlist">
              <AddToWishList product={foodInformation} />
            </div>
          </div>
          <div
            className="rating-container"
            style={
              foodInformation.isVegetarian
                ? { backgroundColor: "green" }
                : { backgroundColor: "red" }
            }
          >
            <FontAwesomeIcon icon={faStar} size="lg" />{" "}
            <span>{foodInformation.rating}</span>
          </div>
        </div>
        <div className="product-details-container">
          <h1>{foodInformation.title}</h1>
          <p className="food-price ">₹{foodInformation.price}</p>
          <hr />
          <p className="food-description">
            <b>Description :</b>
            {foodInformation.description}
          </p>
          <p className="food-description">
            Restaurant : {foodInformation.restaurant}
          </p>
          <div className="food-button">
            <AddToCart product={foodInformation} />
          </div>
        </div>
      </div>
    </div>
  );
};
