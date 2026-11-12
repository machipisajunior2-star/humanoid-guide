import axios from "axios";
import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "./newsType";

export const fetchNewsRequest = () => {
  return {
    type: FETCH_NEWS_REQUEST,
  };
};
export const fetchNewsSuccess = (news) => {
  return {
    type: FETCH_NEWS_SUCCESS,
    payload: news,
  };
};
export const fetchNewsFailure = (error) => {
  return {
    type: FETCH_NEWS_FAILURE,
    payload: error,
  };
};

export const fetchNews = () => {
  return (dispatch) => {
    dispatch(fetchNewsRequest());
    axios
      .get("https://api.currentsapi.services/v1/search", {
        params: {
          apiKey: "xWNpiP7C8U-omRRh5D9r5ch-hyLrokkL-g50H8KFnKNeVraQ",
          keywords: "Humanoid Robotics",
          page_size: "20",
          language: "en",
        },
      })
      .then((response) => {
        const news = response.data;
        dispatch(fetchNewsSuccess(news));
        localStorage.setItem("news", JSON.stringify(news));
      })
      .catch((error) => {
        dispatch(fetchNewsFailure(error.message));
      });
  };
};
