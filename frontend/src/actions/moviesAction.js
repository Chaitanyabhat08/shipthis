import { MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_FAILURE } from "../constants/movieConstants";

import axios from 'axios';

export const getMovies = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_REQUEST});
    const { data } = await axios.get(`http://localhost:4000/api/v1/movies/allmovies`);
    console.log(data);
    dispatch({ type: MOVIES_SUCCESS, payload: data.allmovies })
  } catch (error) {
    dispatch({ type: MOVIES_FAILURE, payload: error.response.data.message });
  }
}