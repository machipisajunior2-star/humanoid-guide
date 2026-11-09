import navigationColors from "../../data/navigation-color.json"
import {CHANGE_NAVIGATION_COLOR} from "./navigationColorType"

export const changeNavigationColor = (data) => {
    return {
        type: CHANGE_NAVIGATION_COLOR,
        color: data.color,
        navigation: data.navigation 
    }
}

export const setNavigationColor = (params) => {
      if (params.slice(1).split("/")[0] !== "") {
        const index = params.slice(1).indexOf("/");
        const navigationParam = params.substring(index + 1).slice(1);
        const data = navigationColors.filter(
          (color) => color.navigation === navigationParam,
        );
        if (data.length > 0) {
          return (dispatch) => {
              dispatch(changeNavigationColor(data[0]));
            }
        }
      }
      return (dispatch) => {
        dispatch(changeNavigationColor({data: "", color: ""}));
      }
} 