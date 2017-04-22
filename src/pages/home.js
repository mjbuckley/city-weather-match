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
        mTmxAv={props.mTmxAv}
        mTmnAv={props.mTmnAv}
        andTmnLe32={props.andTmnLe32}
        andSnGe1={props.andSnGe1}
        andSnCGe1={props.andSnCGe1}
        andPrGe5Ti={props.andPrGe5Ti}
        updateWeatherState={props.updateWeatherState}
      />

    </div>
  );
}

export default Home;
