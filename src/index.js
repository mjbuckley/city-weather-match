import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import About from './pages/about.js';
import Home from './pages/home.js';
import Search from './pages/search';
import Results from './pages/results';
import MetroArea from './pages/metroarea';
import CityLocations from './pages/citylocations';
import NotFound from './pages/notfound.js';
import './css/index.css';
import asyncComponent from './components/asynccomponent.js';

// This will return the Location component, but it allows Chart.js to be downloaded when needed rather than upfront. See asynccomponent.js for more info. 
const AsyncLocation = asyncComponent(() => import('./pages/location.js'));

ReactDOM.render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/search" component={Search}/>
      <Route path="/results" component={Results}/>
      <Route path="/metro-areas/:metroarea" component={MetroArea}/>
      <Route path="/location/:city/:state" component={CityLocations}/>
      <Route path="/location/:city/:state/:station" component={AsyncLocation}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'));
