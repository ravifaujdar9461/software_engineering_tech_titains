import React, { useContext } from "react";
import { FoodListContext } from "../../context/FoodListContext";
import { toast } from "react-toastify";

export const RemoveFromCart = ({ product }) => {
  const { dispatch } = useContext(FoodListContext);
  const handleRemoveFromCart = async () => {
    toast.warning("Removed from  Cart", {
      autoClose: 1000,
      position: "bottom-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    const response = await fetch(`/api/user/cart/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ product }),
    });

    const data = await response.json();

    dispatch({ type: "REMOVE_FROM_CART", payload: data.cart });
  };

  return (
    <button className="remove-cart" onClick={handleRemoveFromCart}>
      Remove from Cart
    </button>
  );
};
