import React from 'react';
import Search from './search';
import HomeImage from '../components/homeimage.js';
import '../css/home.css';
import {Helmet} from "react-helmet";

function Home(props) {
  return (
    <div>

        <Helmet>
          <title>Find Cities By Weather | City Weather Match | Home</title>
          <meta name="description" content="Search thousands of locations to find the cities that match your weather preferrencs." />
        </Helmet>

      <div className="home-wrapper">
        <div className="home">
          <HomeImage className="home-image"/>
          <h2>City Weather Match</h2>
          <p>Find the cities that match your personal weather preferrences. Just enter your desired weather below to search from thousands of locations and find the cities that are a match for you.</p>
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
