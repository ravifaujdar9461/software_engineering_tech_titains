import React from "react"; 
//  React import (functional component banane ke liye)

import { Sidebar } from "../Sidebar"; 
//  Sidebar component (filters / categories / navigation ke liye)

import { FoodContent } from "../FoodContent"; 
//  Main content component (food items list show karega)

export const FoodItems = () => {
  return (
    <div className="main-container">
      {/*  Main layout container (sidebar + content ko side-by-side dikhane ke liye) */}

      <Sidebar /> 
      {/* Left side: filters / categories / navigation */}

      <FoodContent /> 
      {/*  Right side: food items display */}

    </div>
  );
};
