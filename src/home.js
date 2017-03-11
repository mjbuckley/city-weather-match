import React from 'react';
import Search from './search';

// NOTE that I pass the query param info to search as a "location" prop. This allows me to mimic
// this.props.location.query that top level components would have. Not sure if this is the best
// way to do things though. Might just want better separation between home and search.
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
        location={props.location}
      />
    </div>
  );
}

export default Home;
