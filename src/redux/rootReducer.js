import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product/productReducer";
import themeColorReducer from "./themeColor/themeColorReducer"
import categoryColorReducer from "./categoryColor/categoryColorReducer"

const rootReducer = combineReducers({
    product: productReducer,
    themeColor: themeColorReducer,
    categoryColor: categoryColorReducer
})

export default rootReducer