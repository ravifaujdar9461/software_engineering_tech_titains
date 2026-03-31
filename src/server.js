// feat: setup mock backend server using MirageJS
//  Complete API simulation create kiya without real backend
//  Models define kiye (product, user, cart, etc.)
//  Initial data seed kiya (products, users, categories)
// Routes define kiye for auth, products, cart, wishlist

import { Server, Model, RestSerializer } from "miragejs";

// feat: import all controller handlers (API logic yaha se aata hai)
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";

import {
  addItemToCartHandler,
  getCartItemsHandler,
  removeItemFromCartHandler,
  updateCartItemHandler,
} from "./backend/controllers/CartController";

import {
  getAllCategoriesHandler,
  getCategoryHandler,
} from "./backend/controllers/CategoryController";

import {
  getAllProductsHandler,
  getProductHandler,
} from "./backend/controllers/ProductController";

import {
  addItemToWishlistHandler,
  getWishlistItemsHandler,
  removeItemFromWishlistHandler,
} from "./backend/controllers/WishlistController";

// feat: import mock database data
import { categories } from "./backend/db/categories";
import { products } from "./backend/db/products";
import { users } from "./backend/db/users";

// feat: create MirageJS server function
export function makeServer({ environment = "development" } = {}) {
  return new Server({

    // feat: serializer setup (response format ko control karta hai)
    serializers: {
      application: RestSerializer,
    },

    environment,

    // feat: define database models (like tables in DB)
    models: {
      product: Model,
      category: Model,
      user: Model,
      cart: Model,
      wishlist: Model,
    },

    // feat: initial data load (server start hone par run hota hai)
    seeds(server) {

      // console logs band kiye clean output ke liye
      server.logging = false;

      // products data insert kar rahe hain DB me
      products.forEach((item) => {
        server.create("product", { ...item });
      });

      // users create kar rahe hain with empty cart & wishlist
      users.forEach((item) =>
        server.create("user", { ...item, cart: [], wishlist: [] })
      );

      // categories insert kar rahe hain
      categories.forEach((item) => server.create("category", { ...item }));
    },

    // feat: define API routes (frontend yaha request bhejta hai)
    routes() {

      // base URL set kiya
      this.namespace = "api";

      // auth routes (login/signup)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // products routes
      this.get("/products", getAllProductsHandler.bind(this));
      this.get("/products/:productId", getProductHandler.bind(this));

      //  categories routes
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:categoryId", getCategoryHandler.bind(this));

      //  cart routes (user specific)
      this.get("/user/cart", getCartItemsHandler.bind(this));
      this.post("/user/cart", addItemToCartHandler.bind(this));
      this.post("/user/cart/:productId", updateCartItemHandler.bind(this));
      this.delete(
        "/user/cart/:productId",
        removeItemFromCartHandler.bind(this)
      );

      //  wishlist routes
      this.get("/user/wishlist", getWishlistItemsHandler.bind(this));
      this.post("/user/wishlist", addItemToWishlistHandler.bind(this));
      this.delete(
        "/user/wishlist/:productId",
        removeItemFromWishlistHandler.bind(this)
      );
    },
  });
}
