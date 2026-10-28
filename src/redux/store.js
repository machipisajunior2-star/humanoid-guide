import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productReducer from "./product/productReducer";

const store = configureStore({
  reducer: productReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk),
});

export default store;