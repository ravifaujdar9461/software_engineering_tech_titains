import React, { useContext } from "react";

import { FoodListContext } from "../context/FoodListContext";

export const Sidebar = () => {
  const { state, dispatch } = useContext(FoodListContext);

  const handleRatingChange = (rating) => {
    dispatch({ type: "SET_SELECTED_RATING", payload: rating });
  };

  return (
    <>
      {state.isSlide && (
        <aside className="sidebar-container">
          <div className="sidebar-header">
            <b>Filters</b>
            <span
              onClick={() => dispatch({ type: "ON_CLICKING_CLEAR" })}
              className="clear"
            >
              Clear
            </span>
          </div>
          <div className="sidebar-slider-item">
            <h2>Price</h2>
            <div className="sidebar-slider-label">
              <p>0</p>
              <p>225</p>
              <p>500</p>
            </div>
            <input
              value={state.initialPrice}
              type="range"
              min="0"
              max="500"
              onChange={(e) =>
                dispatch({
                  type: "CHANGING_THE_PRICE",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="sidebar-category">
            <h2>Preferences</h2>
            <div className="sidebar-category-list">
              <li>
                <input
                  type="checkbox"
                  checked={state.showVeg}
                  onChange={() =>
                    dispatch({
                      type: "CHECK_VEG_CATEGORY",
                    })
                  }
                />
                <span>Veg</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={state.showNonVeg}
                  onChange={() =>
                    dispatch({
                      type: "CHECK_NON_VEG_CATEGORY",
                    })
                  }
                />
                <span>Non-Veg</span>
              </li>
            </div>
          </div>
          <div className="sidebar-category">
            <h2>Category</h2>
            <div className="sidebar-category-list">
              <li>
                <input
                  type="checkbox"
                  value="Indian"
                  checked={state.selectedCategory.includes("Indian")}
                  onChange={(e) =>
                    dispatch({
                      type: "FILTER_BY_CATEGORY",
                      payload: e.target.value,
                    })
                  }
                />
                <span>Indian</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Chinese"
                  checked={state.selectedCategory.includes("Chinese")}
                  onChange={(e) =>
                    dispatch({
                      type: "FILTER_BY_CATEGORY",
                      payload: e.target.value,
                    })
                  }
                />
                <span>Chinese</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Italian"
                  checked={state.selectedCategory.includes("Italian")}
                  onChange={(e) =>
                    dispatch({
                      type: "FILTER_BY_CATEGORY",
                      payload: e.target.value,
                    })
                  }
                />
                <span>Italian</span>
              </li>
            </div>
          </div>

          <div className="sidebar-rating">
            <h2>Rating</h2>
            <div className="sidebar-rating-list">
              <li>
                <input
                  type="radio"
                  name="rating"
                  checked={state.selectedRating === 4}
                  onChange={() => handleRatingChange(4)}
                />
                4 stars and above
              </li>
              <li>
                <input
                  type="radio"
                  name="rating"
                  checked={state.selectedRating === 3}
                  onChange={() => handleRatingChange(3)}
                />
                3 stars and above
              </li>
              <li>
                <input
                  type="radio"
                  name="rating"
                  checked={state.selectedRating === 2}
                  onChange={() => handleRatingChange(2)}
                />
                2 stars and above
              </li>
              <li>
                <input
                  type="radio"
                  name="rating"
                  checked={state.selectedRating === 1}
                  onChange={() => handleRatingChange(1)}
                />
                1 star and above
              </li>
            </div>
          </div>
          <div className="sidebar-sortby-price">
            <h2>Sort By</h2>
            <div className="sidebar-sortby-price-list">
              <li>
                <input
                  type="radio"
                  name="sort"
                  id="sortLowToHigh"
                  checked={state.sortBy === "lowToHigh"}
                  onChange={() => dispatch({ type: "SORT_LOW_TO_HIGH" })}
                />
                Price - Low to High
              </li>
              <li>
                <input
                  type="radio"
                  name="sort"
                  id="sortHighToLow"
                  checked={state.sortBy === "highToLow"}
                  onChange={() => dispatch({ type: "SORT_HIGH_TO_LOW" })}
                />
                Price - High to Low
              </li>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
