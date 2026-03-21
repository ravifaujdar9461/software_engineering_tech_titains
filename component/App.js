import React from "react";
import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";

import Home from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { WishList } from "./pages/Wishlist";
import { Header } from "../components/Header";
import { FoodItems } from "./pages/FoodItems";
import { FoodInformation } from "./pages/FoodInformation";
import { SignUp } from "./pages/SignUp";
import { RequiresAuth } from "./RequiresAuth";
import { Profile } from "./pages/Profile";
import { Checkout } from "./pages/Checkout";
import "../components/style.css";
import "../components/FoodItems.css";
import "../components/login.css";
import "../components/Cart.css";
import "../components/Wishlist.css";
import "../components/Profile.css";
import "../components/Address.css";
import "../components/AddressForm.css";
import "../components/Checkout.css";
import "../components/FoodInformation.css";

import { Error } from "./pages/Error";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route
          path="/wishList"
          element={
            <RequiresAuth>
              <WishList />
            </RequiresAuth>
          }
        />
        <Route path="/foodItems" element={<FoodItems />} />
        <Route path="/foodItems/:id" element={<FoodInformation />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
