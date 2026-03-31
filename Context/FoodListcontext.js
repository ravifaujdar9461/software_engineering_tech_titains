// feat: implement FoodListContext for global product and category state management
// - Created context using React Context API with useReducer
// - Integrated API calls to fetch categories and product data
// - Managed global state for food items and categories
// - Enabled centralized dispatch for state updates

import React, { createContext, useEffect, useReducer } from "react";

import { reducer, initialState } from "../reducer/reducer";

// feat: create FoodListContext to share product and category data globally
export const FoodListContext = createContext();

// feat: define FoodListProvider to manage global state using reducer
// - Handles fetching and storing categories and products
// - Provides state and dispatch across application

export const FoodListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // feat: fetch category data on component mount
  // - Calls API endpoint for categories
  // - Dispatches data to reducer for state update

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();

      dispatch({
        type: "FETCH_SUCCESSFUL_HOME_DATA",
        payload: data.categories,
      });
    };
    getData();
  }, []);

  // feat: fetch product data on component mount
  // - Calls API endpoint for products
  // - Dispatches data to reducer for global state storage

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();

      dispatch({
        type: "FETCH_SUCCESSFUL_ALL_FOODLIST_DATA",
        payload: data.products,
      });
    };
    getData();
  }, []);

  return (
    // feat: provide global state and dispatch to child components
    <FoodListContext.Provider value={{ state, dispatch }}>
      {children}
    </FoodListContext.Provider>
  );
};
