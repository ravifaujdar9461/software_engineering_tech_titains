import React from "react";
import { Sidebar } from "../Sidebar";
import { FoodContent } from "../FoodContent";

export const FoodItems = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <FoodContent />
    </div>
  );
};
