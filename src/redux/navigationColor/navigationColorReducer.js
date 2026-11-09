import { CHANGE_NAVIGATION_COLOR } from "./navigationColorType";

const initialState = {
  color: "",
  navigation: "",
};

const navigationColorChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAVIGATION_COLOR:
      return action.navigation !== state.navigation
        ? {
            ...state,
            color: action.color,
            navigation: action.navigation,
          }
        : state;
    default:
      return state;
  }
};

export default navigationColorChangeReducer;
