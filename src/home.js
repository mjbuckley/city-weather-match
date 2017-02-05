import React from 'react';
import Search from './search';

// NOTE that I pass the query param info to search as a location prop. This allows me to mimic
// this.props.location.query that top level components would have. Not sure if this is the best
// way to do things though. Might just want better separation between home and search.
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
        location={props.location}
      />
    </div>
  );
}

export default Home;
