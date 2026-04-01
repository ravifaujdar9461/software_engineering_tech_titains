import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FoodListContext } from "../../context/FoodListContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { ErrorContext } from "../../context/ErrorContext";

export const SignUp = () => {
  const { state, dispatch } = useContext(FoodListContext);

  const { profile, setProfile, setToken, signUpData, setSignUpData } =
    useContext(AuthContext);

  const { errors, setErrors } = useContext(ErrorContext);

  const navigate = useNavigate();

  const handleInput = (e, fieldName) => {
    const { value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSignUp = async () => {
    const validationErrors = {};

    if (!signUpData.firstName) {
      validationErrors.firstName = "First name is required";
    }

    if (!signUpData.lastName) {
      validationErrors.lastName = "Last name is required";
    }

    if (!signUpData.email) {
      validationErrors.email = "Email is required";
    }

    if (!signUpData.password) {
      validationErrors.password = "Password is required";
    }

    if (!signUpData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm password is required";
    } else if (signUpData.password !== signUpData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords don't match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (signUpData.password === signUpData.confirmPassword) {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            firstName: signUpData.firstName,
            lastName: signUpData.lastName,
            email: signUpData.email,
            password: signUpData.password,
          }),
        });
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.encodedToken);
        localStorage.setItem("user", JSON.stringify(data.createdUser));
        setToken(data.encodedToken);
        navigate("/");
        setProfile({
          ...profile,
          firstName: data.createdUser.firstName,
          lastName: data.createdUser.lastName,
          email: data.createdUser.email,
        });
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-details">
          <h1>Sign Up</h1>
          <label>Name</label>
          <input
            value={signUpData.firstName}
            type="text"
            placeholder="Mr. Foodie"
            onChange={(e) => handleInput(e, "firstName")}
            required
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}

          <label htmlFor="">Last Name</label>
          <input
            value={signUpData.lastName}
            type="text"
            placeholder="Mr. Foodie"
            onChange={(e) => handleInput(e, "lastName")}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}

          <label>Email address</label>
          <input
            value={signUpData.email}
            type="text"
            placeholder="xyz@goResto@gmail.com"
            onChange={(e) => handleInput(e, "email")}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <div className="login-password">
            <label>Password</label>
            <div className="signup-password-input-container">
              <input
                value={signUpData.password}
                type={state.showPassword ? "password" : "text"}
                placeholder="Enter password"
                onChange={(e) => handleInput(e, "password")}
                required
              />

              <span
                className="eye-show-password"
                onClick={() => dispatch({ type: "ON_CLICKING_SHOW_PASSWORD" })}
              >
                <FontAwesomeIcon
                  icon={state.showPassword ? faEyeSlash : faEye}
                  style={{ color: "#000000" }}
                />
              </span>

              {errors.password && (
                <span className="error-signup-password">{errors.password}</span>
              )}

              <label style={{ marginTop: "37px" }}>Confirm Password</label>
              <input
                value={signUpData.confirmPassword}
                type={state.showConfirmPassword ? "password" : "text"}
                placeholder="Confirm password"
                id="confirm-password-input"
                onChange={(e) => handleInput(e, "confirmPassword")}
                required
              />
              <span
                className="eye-show-confirm-password"
                onClick={() =>
                  dispatch({ type: "ON_CLICKING_SHOW_CONFIRM_PASSWORD" })
                }
              >
                <FontAwesomeIcon
                  icon={state.showConfirmPassword ? faEyeSlash : faEye}
                  style={{ color: "#000000" }}
                />
              </span>
              {errors.confirmPassword && (
                <span className="error-signup-confirm-password">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>

          <div className="login-btn">
            <button onClick={handleSignUp}>Create New Account</button>
          </div>
          <div>
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
