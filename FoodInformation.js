import React, { useContext } from "react"; // React + useContext hook (global state access ke liye)
import { useParams } from "react-router-dom"; // URL se dynamic id lene ke liye
import { FoodListContext } from "../../context/FoodListContext"; // Global food data context
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Icon use karne ke liye
import { faStar } from "@fortawesome/free-solid-svg-icons"; // Star icon for rating
import { AddToWishList } from "../AddToWishList"; // Wishlist component
import { AddToCart } from "../AddToCart"; // Cart component

export const FoodInformation = () => {
  const { state } = useContext(FoodListContext); 
  //  Context se food list ka data le rahe hain (global state)

  const { id } = useParams(); 
  //  URL se id fetch kar rahe hain (dynamic routing ka part)

  const foodInformation = state.foodList.find(({ _id }) => id === _id); 
  //  foodList me se us item ko find kar rahe hain jiska _id URL id ke equal ho

  console.log(foodInformation); 
  //  Debugging ke liye console me selected product show karega

  return (
    <div className="topToBody productlist-container">
      <div className="product-details-main">

        <div className="product-details-image">
          <img src={foodInformation.url} alt="" /> 
          {/*  Food image display ho rahi hai */}

          <div className="wishlist-container">
            <div className="food-content-wishlist">
              <AddToWishList product={foodInformation} /> 
              {/* Wishlist button jo current product ko wishlist me add karega */}
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
            {/*  Agar veg hai to green, non-veg hai to red background */}

            <FontAwesomeIcon icon={faStar} size="lg" /> 
            {/*  Star icon show kar raha hai */}

            <span>{foodInformation.rating}</span> 
            {/*  Product rating display */}
          </div>
        </div>

        <div className="product-details-container">
          <h1>{foodInformation.title}</h1> 
          {/*Product ka naam */}

          <p className="food-price ">₹{foodInformation.price}</p> 
          {/*  Product price */}

          <hr />

          <p className="food-description">
            <b>Description :</b>
            {foodInformation.description}
          </p>
          {/*  Product description */}

          <p className="food-description">
            Restaurant : {foodInformation.restaurant}
          </p>
          {/* Restaurant name */}

          <div className="food-button">
            <AddToCart product={foodInformation} /> 
            {/*  Add to cart button jo current product cart me add karega */}
          </div>
        </div>

      </div>
    </div>
  );
};