import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProfileNavbar } from "../ProfileNavbar";
import { ProfileInfo } from "../ProfileInfo";
import { Address } from "../Address";
import { OrderHistroy } from "./OrderHistroy";

export const Profile = () => {
  return (
    <div className="topToBody profile-outer-container">
      <div className="profile-container">
        <ProfileNavbar />
        <Routes>
          <Route path="profile-information" element={<ProfileInfo />} />
        </Routes>
        <Routes>
          <Route path="address" element={<Address />} />
        </Routes>
        <Routes>
          <Route path="order-history" element={<OrderHistroy />} />
        </Routes>
      </div>
    </div>
  );
};
