import categoryColors from "../../data/category-color.json"
import data from "../../data/data.json"
import {CHANGE_CATEGORY_COLOR} from "./categoryColorType"

export const changeCategoryColor = (data) => {
    return {
        type: CHANGE_CATEGORY_COLOR,
        color: data.color,
        category: data.category 
    }
}

export const setCategoryColor = (params) => {
      if (params.slice(1).split("/")[0] === "category") {
        const index = params.slice(1).indexOf("/");
        const categoryParam = params.substring(index + 1).slice(1);
        const data = categoryColors.filter(
          (color) => color.category === categoryParam,
        );
        if (data.length > 0) {
          return (dispatch) => {
              dispatch(changeCategoryColor(data[0]));
        }
        }
      } else if (params.slice(1).split("/")[0] === "product") {
        const index = params.slice(1).indexOf("/");
        const productParam = params.substring(index + 1).slice(1);
        const productData = data.filter(
          (product) => product.slag === productParam,
        );
        const category = productData[0].useType.toLowerCase();
        const categoryData = categoryColors.filter((color) => color.category === category);

        if (categoryData.length > 0) {
          return (dispatch) => {
            dispatch(changeCategoryColor(categoryData[0]));
          };
        }
      }
      return (dispatch) => {
        dispatch(changeCategoryColor({data: "", color: ""}));
      }
} 

