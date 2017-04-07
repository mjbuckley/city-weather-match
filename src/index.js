import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App';
import Home from './pages/home.js';
import Search from './pages/search';
import Results from './pages/results';
import MetroArea from './pages/metroarea';
import CityLocations from './pages/citylocations';
import Location from './pages/location';
import NotFound from './pages/notfound.js';
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
