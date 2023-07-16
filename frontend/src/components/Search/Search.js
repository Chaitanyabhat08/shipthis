import React, { Fragment, useState } from 'react';
import './Search.css';
import { useNavigate,Link } from "react-router-dom";
import MetaData from '../layout/MetaData';


const Search = () => {
  const [keyWord, setKeyword] = useState("");
  const navigateTo = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyWord.trim()) {
      navigateTo(`/allMovies/${keyWord}`)
    } else {
      navigateTo('/allMovies')
    }
  }
  return (
    <Fragment>
      <MetaData title={`Your results for ${keyWord}`} />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input type='text' placeholder="Search your show" onChange={(e) => setKeyword(e.target.value)} />
        <input type='submit' value="Search" />
        <Link to="/allMovies">
          <input type='submit' value="Cancel" />
        </Link>
      </form>
    </Fragment>
  )
}

export default Search