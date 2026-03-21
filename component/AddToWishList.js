import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FoodListContext } from "../context/FoodListContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddToWishList = ({ product }) => {
  const { state, dispatch } = useContext(FoodListContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToWishList = async () => {
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
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ product }),
      });

      const data = await response.json();
      console.log(data, "datain wish");

      dispatch({ type: "ADD_TO_WISHLIST", payload: data.wishlist });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveFromWishList = async () => {
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

    const response = await fetch(`/api/user/wishlist/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ product }),
    });

    const data = await response.json();

    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: data.wishlist });
  };

  const isInWishList = state.wishList.some((item) => item._id === product._id);

  return (
    <div className="food-content-wishlist">
      {isInWishList ? (
        <button
          style={{ color: "red" }}
          onClick={handleRemoveFromWishList}
          className="food-content-wishlist"
        >
          <FontAwesomeIcon className="cart-wishlist-btn" icon={faHeart} />
        </button>
      ) : (
        <button onClick={handleAddToWishList} className="food-content-wishlist">
          <FontAwesomeIcon className="cart-wishlist-btn" icon={faHeart} />
        </button>
      )}
    </div>
  );
};
