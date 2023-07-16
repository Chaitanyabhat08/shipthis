import React from 'react';
import './Home.css';
import Banner from '../../images/taken-3-movie-banner-8k-ob.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <h1 style={{ textAlign: 'center' }}> Welcome to FLETNIX</h1>
      <div className="banner-container">
        <img src={Banner} alt="background pic" className="imgg" style={{ width: '100%' }} />
       <Link to="/signin"><button type="button" class="btn btn-primary overlay-button">Get Started !!</button></Link>
      </div>
    </div>
  )
}

export default Home;
