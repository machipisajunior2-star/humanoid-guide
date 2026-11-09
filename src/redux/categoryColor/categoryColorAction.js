import categoryColors from "../../data/category-color.json"
import {CHANGE_CATEGORY_COLOR} from "./categoryColorType"

export const changeCategoryColor = (data) => {
    return {
        type: CHANGE_CATEGORY_COLOR,
        color: data.color,
        category: data.category 
    }
}

export const setCategoryColor = (params) => {
      const data = categoryColors.filter((color) => color.category === params);
      if (data.length > 0) {
        return (dispatch) => {
          dispatch(changeCategoryColor(data[0]));
        };
      }

      return (dispatch) => {
        dispatch(changeCategoryColor({data: "", color: ""}));
      }
} 

