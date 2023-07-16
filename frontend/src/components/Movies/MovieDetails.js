import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesbyId } from "../../actions/moviesAction";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesbyId(id));
  }, [dispatch, id]);

  const { loading, movie, error } = useSelector((state) => state.movies);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-wrapper">
        <h1 className="movie-details-heading">Movie Details</h1>
        {movie && (
          <div className="movie-details">
            <h2 className="movie-details-title">{movie.title}</h2>
            <p className="movie-details-info">
              <span className="movie-details-label">Director</span>{" "}
              {movie.director}
            </p>
            <p className="movie-details-info">
              <span className="movie-details-label">Cast</span> {movie.cast}
            </p>
            <p className="movie-details-info">
              <span className="movie-details-label">Country</span>{" "}
              {movie.country}
            </p>
            <p className="movie-details-info">
              <span className="movie-details-label">Date Added</span>{" "}
              {movie.date_added}
            </p>
            <p className="movie-details-info">
              <span className="movie-details-label">Description</span>{" "}
              {movie.description}
            </p>
            <p className="movie-details-info">
              <span className="movie-details-label">Duration</span>{" "}
              {movie.duration}
            </p>
            <p className="movie-details-info">
              <span className="movie-details-label">Listed In</span>{" "}
              {movie.listed_in}
            </p>
            <p className="movie-details-info">
              <span className="movie-details-label">Rating</span>{" "}
              {movie.rating}
            </p>
            <p className="movie-details-info">
              <span className="movie-details-label">Release Year</span>{" "}
              {movie.release_year}
            </p>
            <p className="movie-details-info">
              <span className="movie-details-label">Show Type</span>{" "}
              {movie.showtype}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
