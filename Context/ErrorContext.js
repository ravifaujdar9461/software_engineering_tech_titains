// feat: implement ErrorContext for centralized error handling
//  Created ErrorContext using React Context API
//  Managed global error state accessible across components
//  Provided setter function to update error messages dynamically
//  Enables consistent and reusable error handling mechanism

import React, { createContext, useState } from "react";

// feat: create ErrorContext to share error state globally
export const ErrorContext = createContext();

// feat: define ErrorProvider to wrap application
//  Stores error data in state
//  Provides errors and setErrors to child components

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState({}); // global error state

  return (
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorContext.Provider>
  );
};
