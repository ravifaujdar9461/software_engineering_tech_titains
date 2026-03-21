import React, { useContext, useEffect, useRef } from "react";
import { FoodListContext } from "../context/FoodListContext";
import { Link } from "react-router-dom";

export const Search = () => {
  const { state, dispatch } = useContext(FoodListContext);
  const searchContainerRef = useRef(null);

  const filteredFoodList = state.foodList.filter(({ title }) =>
    title.toLowerCase().includes(state.inputValue.toLowerCase())
  );

  const handleWindowClick = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      dispatch({ type: "CLOSE_SEARCH" });
    }
  };

  const clearInputValue = () => {
    dispatch({ type: "CLOSE_SEARCH" });
  };

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  });

  return (
    <div className="input-search" ref={searchContainerRef}>
      <input
        onChange={(e) =>
          dispatch({ type: "SEARCH_DATA", payload: e.target.value })
        }
        onClick={clearInputValue}
        value={state.inputValue}
        type="search"
        placeholder="type here..."
      />

      {(state.isSearchOpen || state.inputValue) && (
        <div>
          {filteredFoodList.length === 0 ? (
            <p className="no-data-found">No data found</p>
          ) : (
            filteredFoodList.map(({ _id, title, url, price, description }) => (
              <Link
                to={`/foodItems/${_id}`}
                className="search-output-item"
                key={_id}
                onClick={clearInputValue}
              >
                <img src={url} alt="" className="search-output-item-image" />
                <div className="search-output-item-details">
                  <div className="search-output-item-upper">
                    <h3>{title}</h3>
                    <div className="search-output-price-details">
                      <h3>₹ {price}</h3>
                    </div>
                  </div>
                  <div className="search-output-item-desc">
                    <p className="text-md">{description}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};
