import React from 'react';
import { Link } from 'react-router';
import buildLink from './buildlink.js';
import './css/results.css';
import CitiesList from './citieslist.js';

function Results(props) {

  return (
    <div className="CityResults">
      <h2>Results</h2>

      {(props.matches.length > 0) ? (

      <div className="wrapper">
        <CitiesList
          mTmxAv={props.mTmxAv}
          mTmnAv={props.mTmnAv}
          andSnGe1={props.andSnGe1}
          andPrGe5Ti={props.andPrGe5Ti}
          andTmnLe32={props.andTmnLe32}
          isActive={props.isActive}
          matches={props.matches}
        />
      </div>

      ) : (

      <div className="wrapper">
        <p>
        Sorry, there were no matches.  Please <Link to={buildLink(props, "/search")}>try again</Link> with new search values.
        </p>
      </div>
      
      )}

    </div>
  );
}

export default Results;
