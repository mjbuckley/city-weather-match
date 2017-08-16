import React from 'react';
import { Link } from 'react-router'
import buildLink from '../utils/buildlink.js';
import SharedAreaList from '../components/sharedarealist.js';
import Graph from '../components/graph.js';
import '../css/location.css';
import {Helmet} from "react-helmet";

const stationsObj = require('../data/weather.json');

function Location(props) {

  const station = decodeURIComponent(props.params.station);
  const city = decodeURIComponent(props.params.city);
  const state = decodeURIComponent(props.params.state);

  // Make sure station in url is real. If not, return error message.
  if (stationsObj[station] === undefined) {
    return (
      <div className="location error">

      <Helmet>
        <title>Error | Station Does Not Exist | City Weather Match</title>
        <meta name="description" content="Error page. Station ID does not exist." />
        <meta name="robots" content="noindex" />
      </Helmet>

        <p>The station ID that you entered in the URL does not exist.</p>
      </div>
    );
  }

  // Make sure city and state in url match the station in the url. If not, return error message.
  if (city !== stationsObj[station]["city"] || state !== stationsObj[station]["state"]) {
    return (
      <div className="location error">

      <Helmet>
        <title>Error | Station Does Not Match Location | City Weather Match</title>
        <meta name="description" content="Error page. Station ID does not match location" />
        <meta name="robots" content="noindex" />
      </Helmet>

        <p>The city and/or state that you entered in the URL do not match the station ID.</p>
      </div>
    );
  }


  // Keep in mind that the weather values below are values for the station, not search values.
  const multiCity = stationsObj[station]["multiCity"];
  const sharedarea = stationsObj[station]["sharedarea"];
  const hmTmxAv = stationsObj[station]["mTmxAv"][12];
  const lmTmnAv = stationsObj[station]["mTmnAv"][12];
  const andSnGe1 = stationsObj[station]["andSnGe1"];
  const andSnCGe1 = stationsObj[station]["andSnCGe1"];
  const andPrGe5Ti = stationsObj[station]["andPrGe5Ti"];
  const andTmnLe32 = stationsObj[station]["andTmnLe32"];
  const andTmxGe60 = stationsObj[station]["andTmxGe60"];
  const andTmxGe80 = stationsObj[station]["andTmxGe80"];
  const highTemp = stationsObj[station]["mTmxAv"].slice(0, 12); // Arr of avg monthly high temp values
  const lowTemp = stationsObj[station]["mTmnAv"].slice(0, 12); // Arr of avg monthly low temp values
  const path = "/location/" + encodeURIComponent(city) + "/" + encodeURIComponent(state);
  const noaaLink = "https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/products/station/" + station + ".normals.txt";
  const description = "Annual temperature, snowfall, and precipitation averages for " + city + ", " + state + " at NOAA weather station " + station;


  return (
    <div className="location">

    <Helmet>
      <title>{city}, {state} Weather Averages | City Weather Match</title>
      <meta name="description" content={description} />
    </Helmet>

      <div className="location-title-graph">
        <h2 className="city-name">{city}, {state}</h2>
        <span className="station-name">NOAA Weather Station {station}</span>

        <Graph highTemp={highTemp} lowTemp={lowTemp} />
      </div>



      <div className="location-weather-stats-wrapper">
        <section className="location-weather-stats">
          <h3>Weather Stats</h3>

          <div className="location-weather-stats-info">
            <section className="column1">
              <h4>Heat</h4>
              <ul>
                <li>Days above 60 °F: <span className="value">{andTmxGe60}</span></li>
                <li>Days above 80 °F: <span className="value">{andTmxGe80}</span></li>
                <li>Avg. high temp during the hottest month: <span className="value">{hmTmxAv} °F</span></li>
              </ul>
            </section>

            <section className="column2">
              <h4>Cold</h4>
              <ul>
                <li>Days that drops below freezing: <span className="value">{andTmnLe32}</span></li>
                <li>Avg. low temp during the coldest month: <span className="value">{lmTmnAv} °</span>F</li>
              </ul>
            </section>

            <section className="column3">
              <h4>Precipitation</h4>
              <ul>
                <li>Days with 1+ inches of snowfall: <span className="value">{andSnGe1}</span></li>
                <li>Days with 1+ inches of snow cover: <span className="value">{andSnCGe1}</span></li>
                <li>Rainy days: <span className="value">{andPrGe5Ti}</span></li>
              </ul>
            </section>
          </div>
        </section>
      </div>


      <div className="location-additional-info-wrapper">
        <section className="location-additional-info">
          <h3>Supplementary Information</h3>

          { (multiCity.length > 1) ? (
            <div className="item">
              <h4>Additional wearther stations</h4>
              <p>There are {multiCity.length} NOAA weather stations in {city}. <Link to={buildLink(props, path)}>Click to view</Link> info on all stations.</p>
            </div>
          ) : null}

          {(sharedarea.length > 0) ? (
            <SharedAreaList
              sharedarea={sharedarea}
              city={city}
              state={state}
              weatherValues={props.weatherValues}
              isActive={props.isActive}
            />
          ) : null}

          <div className="item">
            <h4>More data</h4>
            <p>For more information about the data used here, see the <Link to={buildLink(props, "/about")}>About</Link> page. To view a text file with all of the raw weather data for this location, <a href={noaaLink}>click here.</a> This link will take you to NOAA's website, and it is best viewed on a larger screen.</p>
          </div>

        </section>
      </div>

    </div>
  );
}

export default Location;
