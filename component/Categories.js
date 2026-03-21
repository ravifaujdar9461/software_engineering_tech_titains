import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FoodListContext } from "../context/FoodListContext";

export const Categories = () => {
  const { state, dispatch } = useContext(FoodListContext);

  const handleClickCategory = (categoryName) => {
    dispatch({
      type: "SET_SELECTED_CATEGORY",
      payload: [categoryName], // Set the clicked category as the only selected category
    });
  };

  return (
    <div className="food-categories">
      {state.foodHome.map(({ _id, categoryName, url }) => (
        <Link
          to="/foodItems"
          key={_id}
          className="cuisines"
          onClick={() => handleClickCategory(categoryName)}
        >
          <img src={url} alt={categoryName} />
          <div>
            <h1>{categoryName}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};
