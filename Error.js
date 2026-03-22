import React from "react";
import { useNavigate } from "react-router-dom"; // "usenavigate" use for page redirecting
import "./Error.css";// Styling
import error from "../../images/error.gif";// Error image

export function Error() {
  const navigate = useNavigate();// Navigation handler for redirecting to other pages
  
  return (
    <div className="error-container flex-center topToBody">
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
