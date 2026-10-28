import axios from "axios";
import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from "./productType";

export const fetchProductRequest = () => {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
};
export const fetchProductSuccess = (product) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: product,
  };
};
export const fetchProductFailure = (error) => {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
  };
};

export const fetchProduct = (slug) => {
  return (dispatch) => {
    dispatch(fetchProductRequest());
    axios.get(`https://botlero.com/api/robots/${slug}`)
      .then((response) => {
        const product = response.data;
        dispatch(fetchProductSuccess(product));
      })
      .catch((error) => {
        dispatch(fetchProductFailure(error.message));
      });
  };
};
