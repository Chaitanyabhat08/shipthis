import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_FAILURE, SINGLE_MOVIES_SUCCESS, SINGLE_MOVIES_FAILURE, SINGLE_MOVIES_REQUEST,CLEAR_ERRORS } from "../constants/movieConstants";

import axios from 'axios';

export const getMovies = (keyWord = "", currentPage = 1,category = "All", age) => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_REQUEST});
    const { data } = await axios.get(`/api/v1/movies/allmovies?keyWord=${keyWord}&page=${currentPage}&category=${category}&age=${age}`);
    dispatch({ type: MOVIES_SUCCESS, payload: data});
  } catch (error) {
    dispatch({ type: MOVIES_FAILURE, payload: error.response.data.message });
  }
}

export const getMoviesbyId = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_MOVIES_REQUEST });
    const { data } = await axios.get(`/api/v1/movies/id?${id}`);
    dispatch({ type: SINGLE_MOVIES_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response ? error.response.data : 'An error occurred';
    dispatch({ type: SINGLE_MOVIES_FAILURE, payload: errorMessage });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}