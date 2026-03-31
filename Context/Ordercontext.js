// feat: implement OrderContext for managing order state globally
// - Created OrderContext using React Context API
// - Managed order data using useState hook
// - Provides order details and setter function across application
// - Enables centralized handling of user order information

import React, { createContext, useState } from "react";

// feat: create OrderContext to share order data globally
export const OrderContext = createContext();

// feat: define OrderProvider to wrap application
// - Stores order information in state
// - Allows updating order data from any component

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(""); // order state

  return (
    // feat: provide order state and setter to child components
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
