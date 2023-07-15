import './Movies.css';
import React, { useEffect } from 'react';
import { getMovies } from '../../actions/moviesAction';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layout/Loader"

const AllMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies())
  }, [dispatch]);
  const { user, isAuthenticated } = useSelector(state => state.user);
  const {loading, movies} = useSelector((state) => state.movies);
  return (
    <>{loading ?
      <Loader/>:
      <div>
        <h1>Hey your movies</h1>
      </div>
    }
    </>
  )
}

export default AllMovies;