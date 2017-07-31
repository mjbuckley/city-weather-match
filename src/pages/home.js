import React from 'react';
import Search from './search';
import '../css/home.css';

function Home(props) {
  return (
    <div>

      <div className="home-wrapper">
        <div className="home">
          <div className="fake-image">Image goes here</div>
          <h2>City Weather Match</h2>
          <p>Enter you're weather preferences and search nearly 4000 locations to find the cities that match the type of weather that you want.</p>
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
