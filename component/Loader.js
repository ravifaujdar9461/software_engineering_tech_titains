import React from "react";
import loader from "../images/giphy.gif";
import "../components/Loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loader} alt="" className="loader" />
    </div>
  );
};
