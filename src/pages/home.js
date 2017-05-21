import React from 'react';
import Search from './search';
import '../css/home.css';

function Home(props) {
  return (
    <div>

      <div className="home-wrapper">
        <div className="home-page">
          <h2>Home Page Info Here</h2>
          <p>There will be text and images here explaining the site</p>
          <p>More text and exciting stuff!</p>
        </div>
      </div>

      <Search
        weatherValues={props.weatherValues}
      />

    </div>
  );
}

export default Home;
