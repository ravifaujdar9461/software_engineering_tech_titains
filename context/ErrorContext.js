// feat: implement ErrorContext for centralized error state management
// Created ErrorContext using React Context API
// Managed global error state across the application
// Provided setter function to update errors dynamically
// Enables consistent error handling in different components

import React, { createContext, useState } from "react";

// feat: create ErrorContext to share error data globally
export const ErrorContext = createContext();

// feat: define ErrorProvider to wrap application
// Stores error messages or objects in state
// Provides access to update errors from any component

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState({}); // global error state

  return (
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorContext.Provider>
  );
};
