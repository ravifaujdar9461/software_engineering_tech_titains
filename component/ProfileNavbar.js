import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const ProfileNavbar = () => {
  const [setColor] = useState({
    profileInfo: true,
    address: false,
    orderHistroy: false,
  });

  const location = useLocation();

  return (
    <div className="profile-navbar">
      <NavLink
        style={
          location.pathname === "/profile/profile-information"
            ? { backgroundColor: "#b468fa" }
            : {}
        }
        className="profile-nav-item nav-link-item"
        to="/profile/profile-information"
        onClick={() =>
          setColor({ profileInfo: true, address: false, orderHistroy: false })
        }
      >
        Profile Information
      </NavLink>

      <NavLink
        style={
          location.pathname === "/profile/address"
            ? { backgroundColor: "#b468fa" }
            : {}
        }
        className="profile-nav-item nav-link-item"
        to="/profile/address"
        onClick={() =>
          setColor({ profileInfo: false, address: true, orderHistroy: false })
        }
      >
        Addresses
      </NavLink>

      <NavLink
        style={
          location.pathname === "/profile/order-history"
            ? { backgroundColor: "#b468fa" }
            : {}
        }
        className="profile-nav-item nav-link-item"
        to="/profile/order-history"
        onClick={() =>
          setColor({ profileInfo: false, address: false, orderHistroy: true })
        }
      >
        Order History
      </NavLink>
    </div>
  );
};
