import React, { useContext } from "react";
import { FoodListContext } from "../context/FoodListContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Component to handle Add to Cart functionality
export const AddToCart = ({ product }) => {
  // Access cart state and dispatch function from context
  const { state, dispatch } = useContext(FoodListContext);

  // Get user authentication token
  const { token } = useContext(AuthContext);

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle adding product to cart
  const handleAddToCart = async () => {
    // Show success toast if user is logged in
    token &&
      toast.success("Successfully added to the cart", {
        autoClose: 1000,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    try {
      // If user is not logged in, redirect to login page
      if (!token) {
        navigate("/login");
        return;
      }

      // Send POST request to add product to cart
      const response = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify({ product }),
      });

      // Convert response to JSON
      const data = await response.json();

      // Update cart state using dispatch
      dispatch({ type: "ADD_TO_CART", payload: data.cart });
    } catch (error) {
      // Log error if something goes wrong
      console.error("Error:", error);
    }
  };

  // Check if product is already in cart
  const isInCart = state.cart.some((item) => item._id === product._id);

  return (
    <div className="add-to-cart-btn">
      {/* If product is already in cart and user is logged in, show "Go to Cart" button */}
      {isInCart && token ? (
        <Link to="/cart">
          <button style={{ backgroundColor: "#2da76e" }}>Go to Cart</button>
        </Link>
      ) : (
        // Otherwise show "Add to Cart" button
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
    </div>
  );
};
