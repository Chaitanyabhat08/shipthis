import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_FAILURE, SINGLE_MOVIES_SUCCESS, SINGLE_MOVIES_FAILURE, SINGLE_MOVIES_REQUEST } from "../constants/movieConstants";

import axios from 'axios';

export const getMovies = (keyWord = "", currentPage = 1,) => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_REQUEST});
    const { data } = await axios.get(`http://localhost:4000/api/v1/movies/allmovies?keyWord=${keyWord}&page=${currentPage}`);
    dispatch({ type: MOVIES_SUCCESS, payload: data});
  } catch (error) {
    dispatch({ type: MOVIES_FAILURE, payload: error.response.data.message });
  }
}

export const getMoviesbyId = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_MOVIES_REQUEST });
    const { data } = await axios.get(`http://localhost:4000/api/v1/movies/id?${id}`);
    console.log(data);
    dispatch({ type: SINGLE_MOVIES_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response ? error.response.data : 'An error occurred';
    dispatch({ type: SINGLE_MOVIES_FAILURE, payload: errorMessage });
  }
};
