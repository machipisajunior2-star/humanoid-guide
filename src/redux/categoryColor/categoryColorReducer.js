import { CHANGE_CATEGORY_COLOR } from "./categoryColorType";

const initialState = {
    color: "",
    category: ""
}

const categoryColorChangeReducer = (state = initialState, action) => {
  console.log(action.category);
  switch (action.type) {
    case CHANGE_CATEGORY_COLOR:
      return action.category !== state.category
        ? {
            ...state,
            color: action.color,
            category: action.category,
          }
        : state;
    default:
      return state;
  }
};

export default categoryColorChangeReducer;
