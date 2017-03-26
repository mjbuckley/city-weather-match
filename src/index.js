import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App';
import Home from './home.js';
import Search from './search';
import Results from './results';
import MetroArea from './metroarea';
import CityLocations from './citylocations';
import Location from './location';
import NotFound from './notfound.js';
import './css/index.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/search" component={Search}/>
      <Route path="/results" component={Results}/>
      <Route path="/metro-areas/:metroarea" component={MetroArea}/>
      <Route path="/location/:city/:state" component={CityLocations}/>
      <Route path="/location/:city/:state/:station" component={Location}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'));
