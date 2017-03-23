import React from 'react';
import Search from './search';

function Home(props) {
  return (
    <div>
      <div>
        <h2>Home Page Info Here</h2>
      </div>
      <Search
        mTmxAv={props.mTmxAv}
        mTmnAv={props.mTmnAv}
        andTmnLe32={props.andTmnLe32}
        andSnGe1={props.andSnGe1}
        andPrGe5Ti={props.andPrGe5Ti}
        updateWeatherState={props.updateWeatherState}
      />
    </div>
  );
}

export default Home;
