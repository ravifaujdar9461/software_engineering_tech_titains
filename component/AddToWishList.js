import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FoodListContext } from "../context/FoodListContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Component to handle Add/Remove Wishlist functionality
export const AddToWishList = ({ product }) => {
  // Access wishlist state and dispatch function from context
  const { state, dispatch } = useContext(FoodListContext);

  // Get user authentication token
  const { token } = useContext(AuthContext);

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle adding product to wishlist
  const handleAddToWishList = async () => {
    // Show success message if user is logged in
    token &&
      toast.success("Successfully added to Wishlist", {
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

      // Send POST request to add product to wishlist
      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ product }),
      });

      // Convert response to JSON
      const data = await response.json();
      console.log(data, "datain wish");

      // Update wishlist state
      dispatch({ type: "ADD_TO_WISHLIST", payload: data.wishlist });
    } catch (error) {
      // Log error if something goes wrong
      console.error("Error:", error);
    }
  };

  // Function to handle removing product from wishlist
  const handleRemoveFromWishList = async () => {
    // Show warning message on removal
    toast.warning("Removed from  Wishlist", {
      autoClose: 1000,
      position: "bottom-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    // Send DELETE request to remove product from wishlist
    const response = await fetch(`/api/user/wishlist/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ product }),
    });

    // Convert response to JSON
    const data = await response.json();

    // Update wishlist state
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: data.wishlist });
  };

  // Check if product is already in wishlist
  const isInWishList = state.wishList.some((item) => item._id === product._id);

  return (
    <div className="food-content-wishlist">
      {/* If product is already in wishlist, show remove button */}
      {isInWishList ? (
        <button
          style={{ color: "red" }}
          onClick={handleRemoveFromWishList}
          className="food-content-wishlist"
        >
          <FontAwesomeIcon className="cart-wishlist-btn" icon={faHeart} />
        </button>
      ) : (
        // Otherwise show add to wishlist button
        <button onClick={handleAddToWishList} className="food-content-wishlist">
          <FontAwesomeIcon className="cart-wishlist-btn" icon={faHeart} />
        </button>
      )}
    </div>
  );
};
