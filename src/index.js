// feat: setup main app entry with routing and global providers
//  React app ko root pe render kiya
//  Router add kiya navigation ke liye
//  Sare context providers wrap kiye for global state management
//  MirageJS server start kiya API mocking ke liye

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./components/App";

import { makeServer } from "./server";
import { HomeProvider } from "./context/HomeContext";
import { FoodListProvider } from "./context/FoodListContext";
import { AuthProvider } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import { OrderProvider } from "./context/OrderContext";

// feat: start mock backend server using MirageJS
// API requests ko simulate karne ke liye server run hota hai
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* feat: router wrap kiya taaki app me navigation possible ho */}
    <Router>

      {/* feat: AuthProvider - login/signup aur token handle karega */}
      <AuthProvider>

        {/* feat: HomeProvider - home related state manage karega */}
        <HomeProvider>

          {/* feat: FoodListProvider - products aur categories ka data handle karega */}
          <FoodListProvider>

            {/* feat: OrderProvider - order related data store karega */}
            <OrderProvider>

              {/* feat: ErrorProvider - global errors handle karega */}
              <ErrorProvider>

                {/* main App component render ho raha hai */}
                <App />

              </ErrorProvider>
            </OrderProvider>
          </FoodListProvider>
        </HomeProvider>
      </AuthProvider>

    </Router>
  </React.StrictMode>
);
