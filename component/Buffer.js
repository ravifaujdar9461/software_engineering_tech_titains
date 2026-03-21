import React from "react";
import Buffer1 from "../images/giphy.gif";

export const Buffer = () => {
  return (
    <div>
      <div className="topToBody  blurImage">
        <img src={Buffer1} alt="" />
        <div style={{ position: "fixed", top: "40%", left: "25%" }}>
          Helo Frendzzzzzzzzzzzzzzzz
        </div>
      </div>
    </div>
  );
};
