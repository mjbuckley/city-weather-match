import React from 'react';
import { Link } from 'react-router';
import buildLink from '../utils/buildlink.js';
import '../css/results.css';
import CitiesList from '../components/citieslist.js';
import {Helmet} from "react-helmet";

function Results(props) {

  // If isActive is false that means there is no active search and a results page makes no sense. Give error message.
  if (props.isActive === false) {
    return (
      <div className="results">

        <Helmet>
          <title>Search Results Error | City Weather Match</title>
          <meta name="description" content="Error page. You must first enter search information to view results." />
          <meta name="robots" content="noindex" />
        </Helmet>

        <div className="results-intro">
          <h2>Search Results</h2>
          <p>You must first enter search information to see results.  <Link to="/search">Go to the search page now.</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className="results">

      <Helmet>
        <title>Search Results | City Weather Match</title>
        <meta name="description" content="Search Results. A listing of all cities that match the weather preferences from the search form." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="results-intro">
        <h2>Search Results</h2>

        {(props.matches.length > 0) ? (
          <p>All of the cities listed below match your search criteria. Click on a city name to view more detailed information about that location.</p>
        ) : (
          <p>Sorry, there were no matches.  Please <Link to={buildLink(props, "/search")}>try again</Link> with new search values.</p>
        )}

      </div>

      {(props.matches.length > 0) ? (

      <div className="results-list">
        <CitiesList
          weatherValues={props.weatherValues}
          isActive={props.isActive}
          matches={props.matches}
        />
      </div>

    ) : null}
    </div>
  );
}

export default Results;
