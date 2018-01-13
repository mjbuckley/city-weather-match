import 'core-js/fn/array/includes'; // pollyfill for array.includes
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import About from './pages/about.js';
import Home from './pages/home.js';
import Search from './pages/search';
import Results from './pages/results';
import CityLocations from './pages/citylocations';
import NotFound from './pages/notfound.js';
import asyncComponent from './components/asynccomponent.js';
import './css/index.css';

const AsyncLocation = asyncComponent(() => import('./pages/location.js'));
const AsyncMetroArea = asyncComponent(() => import('./pages/metroarea.js'));


ReactDOM.render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>

    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/search" component={Search}/>
      <Route path="/results" component={Results}/>
      <Route path="/metro-areas/:metroarea" component={AsyncMetroArea}/>
      <Route path="/location/:city/:state" component={CityLocations}/>
      <Route path="/location/:city/:state/:station" component={AsyncLocation}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'));
