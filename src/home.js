import React from 'react';
import Search from './search';

function Home(props) {
  return (
    <div>
      <div>
        <h2>Home Page Info Here</h2>
      </div>
      <Search
        maxTemp={props.maxTemp}
        lowTemp={props.lowTemp}
        below32={props.below32}
        snowfall={props.snowfall}
        precip={props.precip}
        updateWeatherState={props.updateWeatherState}
      />
    </div>
  );
}

export default Home;
