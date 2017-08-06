import React from 'react';
import Search from './search';
import HomeImage from '../components/homeimage.js';
import '../css/home.css';

function Home(props) {
  return (
    <div>

      <div className="home-wrapper">
        <div className="home">
          <HomeImage className="home-image"/>
          <h2>City Weather Match</h2>
          <p>Find the cities where the typical weather matches your personal preferences. Just enter your desired weather below to search thousands of locations and find the cities that are a match for you.</p>
          <div className="home-start-box">
            <p className="home-start">Start Searching Below</p>
            <p className="home-arrow">▼</p>
          </div>
        </div>
      </div>

      <Search weatherValues={props.weatherValues} />

    </div>
  );
}

export default Home;
