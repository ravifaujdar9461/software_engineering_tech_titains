// feat: implement HomeContext for centralized state management
// - Created HomeContext using React Context API
// - Integrated useReducer for managing application state
// - Provides global state and dispatch for home-related features
// - Enables scalable and maintainable state handling

import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "../reducer/reducer";

// feat: create HomeContext to share state across components
export const HomeContext = createContext();

// feat: define HomeProvider to wrap application
// - Uses reducer pattern for efficient state updates
// - Provides state and dispatch globally

export const HomeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // feat: provide state and dispatch to child components
    <HomeContext.Provider value={{ state, dispatch }}>
      {children}
    </HomeContext.Provider>
  );
};
