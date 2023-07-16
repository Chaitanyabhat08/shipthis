import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_FAILURE } from "../constants/movieConstants";

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