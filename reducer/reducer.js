// feat: implement global state management using reducer pattern
//  initialState me pura app ka data store kiya gaya hai
//  reducer function different actions ko handle karta hai
//  cart, wishlist, filters, address sab yahi manage hote hain

import { v4 as uuid } from "uuid";

// feat: define initial state (app ka default data)
// yaha sab initial values store hoti hain (cart, filters, address etc.)

export const initialState = {
  foodHome: [], // home page data
  isSlide: false, // sidebar toggle
  foodList: [], // all products
  initialPrice: "500", // price filter
  showVeg: false,
  showNonVeg: false,
  selectedRating: null,
  sortBy: null,
  inputValue: "",
  isSearchOpen: false,
  category: [],
  showPassword: false,
  showConfirmPassword: false,
  cart: [], // cart items
  wishList: [], // wishlist items
  isAdded: false,
  editAddressId: null,
  selectedAddressId: null,
  selectedCategory: [],

  // feat: default user address
  addresses: [
    {
      id: uuid(),
      name: "Narendra Chordiya",
      phone: "800771732",
      city: "Pune",
      pin: "411048",
      profileState: "Maharashtra",
      addressText: " Majestique Navkaar,Kondhwa Bk",
    },
  ],

  // feat: demo addresses (testing ke liye)
  demoAddress: [
    {
      id: uuid(),
      name: "John",
      phone: "7898343210",
      city: "Banglore",
      pin: "9844657651",
      addressText: "123 Main St",
      profileState: "Karnataka",
    },
    // baaki demo addresses same rahenge
  ],
};

// feat: reducer function (yaha sari logic handle hoti hai)
// - action.type ke basis pe state update hota hai

export const reducer = (state, action) => {
  switch (action.type) {

    // data fetch hone par store karna
    case "FETCH_SUCCESSFUL_HOME_DATA": {
      return { ...state, foodHome: action.payload };
    }

    // sidebar open/close toggle
    case "SIDEBAR_ACTIVE": {
      return { ...state, isSlide: !state.isSlide };
    }

    // all products store karna
    case "FETCH_SUCCESSFUL_ALL_FOODLIST_DATA": {
      return { ...state, foodList: action.payload };
    }

    // price filter change
    case "CHANGING_THE_PRICE": {
      return { ...state, initialPrice: Number(action.payload) };
    }

    // veg / non-veg toggle
    case "CHECK_VEG_CATEGORY": {
      return { ...state, showVeg: !state.showVeg };
    }
    case "CHECK_NON_VEG_CATEGORY": {
      return { ...state, showNonVeg: !state.showNonVeg };
    }

    // rating filter
    case "SET_SELECTED_RATING": {
      return { ...state, selectedRating: action.payload };
    }

    // sorting low to high
    case "SORT_LOW_TO_HIGH": {
      const sortedFoodList = [...state.foodList].sort(
        (a, b) => a.price - b.price
      );
      return { ...state, foodList: sortedFoodList, sortBy: "lowToHigh" };
    }

    // sorting high to low
    case "SORT_HIGH_TO_LOW": {
      const sortedFoodList = [...state.foodList].sort(
        (a, b) => b.price - a.price
      );
      return { ...state, foodList: sortedFoodList, sortBy: "highToLow" };
    }

    // clear filters
    case "ON_CLICKING_CLEAR": {
      return {
        ...state,
        foodHome: [],
        initialPrice: "500",
        showVeg: false,
        showNonVeg: false,
        selectedRating: false,
        sortBy: null,
        selectedCategory: [],
      };
    }

    // search functionality
    case "SEARCH_DATA": {
      return {
        ...state,
        inputValue: action.payload,
        isSearchOpen: action.payload.trim() !== "",
      };
    }

    case "CLOSE_SEARCH": {
      return {
        ...state,
        inputValue: "",
        isSearchOpen: false,
      };
    }

    // category filter
    case "FILTER_BY_CATEGORY":
      const updatedCategory = state.selectedCategory.includes(action.payload)
        ? state.selectedCategory.filter(
            (addedCategory) => addedCategory !== action.payload
          )
        : [...state.selectedCategory, action.payload];

      return { ...state, selectedCategory: updatedCategory };

    // password show/hide toggle
    case "ON_CLICKING_SHOW_PASSWORD": {
      return {
        ...state,
        showPassword: !state.showPassword,
      };
    }

    // cart add/remove
    case "ADD_TO_CART":
    case "REMOVE_FROM_CART": {
      return { ...state, cart: action.payload };
    }

    // wishlist add/remove
    case "ADD_TO_WISHLIST":
    case "REMOVE_FROM_WISHLIST": {
      return { ...state, wishList: action.payload };
    }

    // quantity increase/decrease
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      };

    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload
            ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
            : item
        ),
      };

    // address handling
    case "ADD_TO_ADDRESS": {
      return {
        ...state,
        isAdded: false,
        addresses: [...state.addresses, action.payload],
      };
    }

    case "SELECT_ADDRESS": {
      return { ...state, selectedAddressId: action.payload };
    }

    // cart clear
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};
