import { MOVIES_FAILURE, MOVIES_REQUEST, MOVIES_SUCCESS,CLEAR_ERRORS } from "../constants/movieConstants";

export const moviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MOVIES_REQUEST:
      return {
        loading: true,
        movies: [],
      }
    case MOVIES_SUCCESS:
      return {
        loading: false,
        movies: action.payload.allmovies,
        moviescount: action.payload.moviesCount,
        resultPerPage: action.payload.resultPerPage,
        filteredMoviesCount: action.payload.filteredMoviesCount,
      }
    case MOVIES_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state;
  }
}
