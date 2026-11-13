import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_FAILURE,
  FETCH_NEWS_SUCCESS,
} from "./newsType";

const storage = JSON.parse(localStorage.getItem("news"));
console.log(storage)
const initialState = {
  loading: false,
  news: {},
  error: "",
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NEWS_SUCCESS:
      return {
        loading: false,
        news: action.payload,
        error: "",
      };
    case FETCH_NEWS_FAILURE:
      return {
        loading: false,
        news: storage,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default newsReducer
