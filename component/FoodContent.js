import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FoodListContext } from "../context/FoodListContext";
import { AddToCart } from "./AddToCart";
import { AddToWishList } from "./AddToWishList";
import { Loader } from "./Loader";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const FoodContent = () => {
  const { state } = useContext(FoodListContext);
  console.log(state.selectedCategory);

  const [isLoader, setIsLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 2000);
  }, []);

  const selectedCategory =
    state.selectedCategory.length === 0
      ? state.foodList
      : state.foodList.filter(({ categoryName }) =>
          state.selectedCategory.includes(categoryName)
        );

  const filterPrice = selectedCategory.filter(
    ({ price }) => Number(price) <= state.initialPrice
  );

  const filterPreferences = filterPrice.filter(({ isVegetarian }) => {
    if (state.showVeg && state.showNonVeg) {
      return true;
    } else if (state.showVeg) {
      return isVegetarian;
    } else if (state.showNonVeg) {
      return !isVegetarian;
    } else {
      return true;
    }
  });

  const filterRating = state.selectedRating
    ? filterPreferences.filter(({ rating }) => rating >= state.selectedRating)
    : filterPreferences;

  return (
    <div className="food-content">
      <ToastContainer />
      {isLoader && <Loader />}
      {filterRating?.length === 0 ? (
        <h1 className="no-products">
          No products found within the selected price range.
        </h1>
      ) : (
        <>
          <h1 className="count">Total Food Items: {filterRating.length}</h1>
          <div className="foodlist">
            {filterRating.map((product) => {
              const {
                _id,
                title,
                description,
                price,
                url,
                isVegetarian,
                rating,
                categoryName,
              } = product;
              return (
                <div className="food-card" key={_id}>
                  <Link to={`/foodItems/${_id}`} className="food-items">
                    <div>
                      <img src={url} alt="indian_cuisine" />
                    </div>

                    <div
                      className="food-rating-container"
                      style={
                        isVegetarian
                          ? { backgroundColor: "green" }
                          : { backgroundColor: "red" }
                      }
                    >
                      <FontAwesomeIcon icon={faStar} size="lg" />{" "}
                      <span>{rating}</span>
                    </div>
                    <div className="details">
                      <div className="description">
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <p>{categoryName}</p>
                      </div>
                      <div className="price-container">
                        <h3 className="price">{price}</h3>
                      </div>
                    </div>
                  </Link>

                  <AddToWishList product={product} />
                  <AddToCart product={product} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
