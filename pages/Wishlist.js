import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FoodListContext } from "../../context/FoodListContext";
import { AddToWishList } from "../AddToWishList";
import emptyWishlist from "../../images/empty-wishlist1.gif";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export const WishList = () => {
  const { state, dispatch } = useContext(FoodListContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
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
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify({ product }),
      });

      const data = await response.json();

      dispatch({ type: "ADD_TO_CART", payload: data.cart });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleIncreaseCartQuantity = (_id) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: _id });
    token &&
      toast.success("Quanity increased by 1", {
        autoClose: 1000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };

  return (
    <>
      <ToastContainer />
      {state.wishList.length === 0 ? (
        <div className="topToBody empty-wishlist">
          <img src={emptyWishlist} alt="" />
          <h1>Your Wishlist is empty</h1>
        </div>
      ) : (
        <div className="topToBody wishlist-card">
          {state.wishList.map((product) => {
            const { _id, title, description, price, url } = product;
            const btnText = state.cart.find((item) => item._id === _id)
              ? "Increase cart quantity"
              : "Add to cart";
            return (
              <div className="food-card" key={_id}>
                <Link to={`/foodItems/${_id}`} className="food-items">
                  <img src={url} alt="indian_cuisine" />
                  <div className="details">
                    <div className="description">
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                    <div className="price-container">
                      <h3 className="price">{price}</h3>
                    </div>
                  </div>
                </Link>
                <AddToWishList product={product} />
                <button
                  style={
                    btnText === "Increase cart quantity"
                      ? { backgroundColor: "#3b54ba" }
                      : null
                  }
                  onClick={
                    btnText === "Increase cart quantity"
                      ? () => handleIncreaseCartQuantity(_id)
                      : () => handleAddToCart(product)
                  }
                >
                  {btnText}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
