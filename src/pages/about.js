import React from 'react';
import '../css/about.css';

function About() {
  return (
    <div className="about">
      <h2>About</h2>
      <p>This will be the about page. It will include info about the site. Things to include here:</p>
      <ul>
        <li>Where the data comes from</li>
        <li>Stations have different number of years on record</li>
        <li>Suggestion to look at other stations in metro area and in same city</li>
        <li>About me, github link, how site was built, etc.</li>
      </ul>
    </div>
  );
}

export default About;
