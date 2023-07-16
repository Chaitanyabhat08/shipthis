import React, { useEffect, useRef, useState } from 'react';
import { getMovies } from '../../actions/moviesAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader';
import Pagination from 'replace-js-pagination';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moviePic from '../../images/card.webp';
import { LogOutUser } from '../../actions/userAction';

const AllMovies = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(true); // Ref to check if component is mounted
  const [currentPage, setCurrentPage] = useState(1);
  const [category, SetCategory] = useState('All');
  const { keyWord } = useParams();
  const history = useNavigate();

  useEffect(() => {
    if (isMounted.current) {
      dispatch(getMovies(keyWord, currentPage));
    }
    return () => {
      isMounted.current = false; // Set the ref to false when component unmounts
    };
  }, [dispatch, keyWord, currentPage]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(getMovies(keyWord, pageNumber));
  };
  const handlecategory = (e) => {
    console.log(e.target.value);
    SetCategory(e.target.value);
  }
  const clearSearch = () => {
    setCurrentPage(1);
    dispatch(getMovies('', 1));
    history('/allMovies');
  };
  const handleLogout = async () => { 
    dispatch(LogOutUser());
  }

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, movies, moviescount, resultPerPage, filteredMoviesCount } = useSelector((state) => state.movies);
  let count = filteredMoviesCount;
  return (
    <>
      {loading && filteredMoviesCount ? (
        <Loader />
      ) : (
        <div>
          <div style={{ display: 'flex', margin: '40px', textAlign: 'center' }}>
            <Link to="/Search">
              <button className="btn btn-dark">Click here to Search</button>
            </Link>
            <button className="btn btn-light" onClick={clearSearch}>
              Clear Search
            </button>
            </div>
            <div style={{display:'flex', justifyContent:'space-evenly'}}>
              <div>
                <select
                style={{ width: '200px' }}
                id="selectId"
                required
                value={category}
                onChange={(e) => SetCategory(e.target.value)}
              >
                <option value="All">ALL</option>
                <option value="TVSH">TV SHOWS</option>
                <option value="MOVS">MOVIES</option>
                </select>
              </div>
              <div>
                <button type="button" className="btn btn-dark" onClick={() => handleLogout}>Logout</button>
              </div>
            </div>
            {
              keyWord ? <h1>{`your movies for search "${keyWord}"`}</h1> : <h1>What you wanna watch today??👀</h1>
            }

          <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
              {movies?.map((movie, index) => (
                <div class="card" style={{ width: '14rem', marginBottom: '20px' }}>
                  <img class="card-img-top" src={moviePic} alt="Card cap" />
                  <div class="card-body">
                    <h5 class="card-title">{movie.title}</h5>
                    <p class="card-text">Cast:{" "}{movie.cast}</p>
                    <p class="card-text">{movie.showtype}</p>
                    <Link to={`/movies/id=${movie._id}`}>
                      <button type="button" class="btn btn-dark">Quick view</button>
                    </Link>
                 
                  </div>
                </div>
              ))}
            </div>

            {resultPerPage < moviescount ? (
              <>
              <p style={{textAlign:'center'}}>{currentPage}</p>
              <div className="paginationBox" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={15}
                  totalItemsCount={filteredMoviesCount}
                  onChange={(pageNumber) => setCurrentPageNo(pageNumber)}
                  nextPageText="Next"
                  prevPageText="Previous"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            </>) : (
                <div></div>
            )}
        </div>
      )}
    </>
  );
};

export default AllMovies;
