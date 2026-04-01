import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";
import error from "../../images/error.gif";

export function Error() {
  const navigate = useNavigate();
  return (
    <div className="error-container flex-center topToBody">
      <img src={error} alt="" />
      <div>
        <p className="text-center paragraph-md">
          There's plenty to see on <span className="name">GoResto.</span>
        </p>

        <p className="text-center paragraph-md">
          If you are hungry try to search or take a look at our{" "}
          <span className="popular-span" onClick={() => navigate("/foodItems")}>
            Popular Products ?
          </span>
        </p>
      </div>
    </div>
  );
}
