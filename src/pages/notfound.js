import React from 'react';
import '../css/notfound.css';
import {Helmet} from "react-helmet";
import { Link } from 'react-router';


/**
 * This is a 404-like page. Because React Router is handling url change once the app is loaded, a
 * true 404 cannot be returned, so this is used instead.
 */
function NotFound() {

  return (
    <div className="notfound">

      <Helmet>
        <title>Error | City Weather Match</title>
        <meta name="description" content="Error page. No content exists at this location." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <p>Sorry, but there is no information located at this url. Please recheck the url or consider visiting the <Link to="/">home page.</Link></p>
    </div>
  );
}

export default NotFound;
