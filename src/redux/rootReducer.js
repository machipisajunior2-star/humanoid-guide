import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product/productReducer";
import themeColorReducer from "./themeColor/themeColorReducer"
import categoryColorReducer from "./categoryColor/categoryColorReducer"
import navigationColorChangeReducer from "./navigationColor/navigationColorReducer"

const rootReducer = combineReducers({
    product: productReducer,
    themeColor: themeColorReducer,
    categoryColor: categoryColorReducer,
    navigationColor: navigationColorChangeReducer
})

export default rootReducer