// feat: implement AuthContext for global authentication state management
//  Created AuthContext using React Context API
//  Managed authentication token and user profile globally
//  Integrated localStorage for persistent user sessions
//  Added signup form state handling for user registration

import React, { createContext, useState } from "react";

// feat: create AuthContext to share authentication data across components
export const AuthContext = createContext();

// feat: define AuthProvider to wrap application
//  Provides token, profile, and signup data globally
//  Enables state updates via setter functions

export const AuthProvider = ({ children }) => {

  // feat: retrieve token and user data from localStorage
  // -Maintains login state even after page refresh
  const encodedToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";

  // feat: manage authentication token state
  const [token, setToken] = useState(encodedToken || "");

  // feat: manage signup form data
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // feat: manage user profile information
  const [profile, setProfile] = useState({
    firstName: user.firstName || "",
    email: user.email || "",
    lastName: user.lastName || "",
  });

  return (
    // feat: provide authentication state to entire application
    <AuthContext.Provider
      value={{
        token,
        setToken,
        profile,
        setProfile,
        signUpData,
        setSignUpData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
