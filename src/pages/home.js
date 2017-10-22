import React from 'react';
import Search from './search';
import HomeImage from '../components/homeimage.js';
import '../css/home.css';
import {Helmet} from "react-helmet";


/**
 * Home page. Note that empty div is a sort of hack to do a pseudo anchor link. I want the arrow on
 * the home page to be a link to something like cityweathermatch#search. It is possible but
 * unpleasant to implement with React Router, so since I'm only doing this once on the site I like
 * this better. It creates a div with no height and a ref, and then on arrow click I scroll to that
 * empty div nodes location.
 */
function Home(props) {

  let spotNode = null;

  function handleClick() {
    spotNode.scrollIntoView();
  }

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
          <p>Find the cities that match your personal weather preferences. Just enter your desired weather below to search from thousands of locations and find the cities that are a match for you.</p>
          <div className="home-start-box">
            <p className="home-start">Start Searching Below</p>
            <p className="home-arrow"><a onClick={handleClick}>▼</a></p>
          </div>
        </div>
      </div>

      <div ref={(spot) => { spotNode = spot; }}></div>

      <Search weatherValues={props.weatherValues} />

    </div>
  );
}

export default Home;
