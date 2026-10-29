import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product/productReducer";
import themeColorReducr from "./themeColor/themeColorReducer"

const rootReducer = combineReducers({
    product: productReducer,
    themeColor: themeColorReducr
})

export default rootReducer