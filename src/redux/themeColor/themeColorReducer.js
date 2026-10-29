import theme_color from "../../data/theme-color-data.json";
import {CHANGE_COLOR} from "./themeColorType";

const initialState = {
  colorPalette: { 
    background: theme_color[0].background, 
    text: theme_color[0].text 
  },
  id: theme_color[0].id,
};

const colorChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        colorPalette: action.colorPalette,
        id: action.id,
      };
    default:
      return state;
  }
}

export default colorChangeReducer