import React from 'react';
import '../css/about.css';
import {Helmet} from "react-helmet";

function About() {
  return (
    <div className="about">

      <Helmet>
        <title>Additional Site Info | City Weather Match | About Page</title>
        <meta name="description" content="Find out about the weather data used on City Weather Match, and learn how to best understand the search results." />
      </Helmet>

      <h2>About</h2>

      <h3>About The Data Used On This Site</h3>

      <p>The data for this site comes from the National Oceanic and Atmospheric Administration's (NOAA) <a href="https://www.ncdc.noaa.gov/data-access/land-based-station-data/land-based-datasets/climate-normals/1981-2010-normals-data">1981-2010 Climate Normals.</a> This dataset contains weather information from that 30 year period for over 9800 weather stations across the country. There is an overwhelming amount of data collected in the Climate Normals, and my goal for this site was to take a small portion of that data and present it in a simple, searchable, and user friendly format. The pieces of data I chose to include and make searchable were those that I felt would best give a good general sense of a city's typical weather. This is obviously a subjective choice, and if you want to see data that is not included on the site just, scroll down to the "Suplementary Information" section on any location's detailed info page and you will find a link to all of the raw data for that location.</p>

      <p>Although there are over 9800 stations in the Climate Normals, there are just under 4000 stations searchable on this site. This is due to the fact that many of the stations in the Climate Normals only have information on a particular type of weather condition, such as temperature or precipitation, but not a complete set of data. Stations were only included on this site if they had data for every weather value used by this site.</p>

      <p>While the Climate Normals dataset is for a 30 year time span, not all stations have data for all 30 years. NOAA uses various methods to deal with these incomplete values. If you are using the data for scientific purposes it is important to know these details, but for the purposes of this site I have not taken years on record into account. If you are interested in how NOAA handles this issue, consult the references section on the <a href="https://www.ncdc.noaa.gov/data-access/land-based-station-data/land-based-datasets/climate-normals/1981-2010-normals-data">NOAA 1981-2010 Climate Normals</a> page.</p>

      <h3>How To Understand And Best Use The Search Results</h3>

      <p>While the search results are accurate, they can occasionally be misleading. Consider a large and geographically diverse city like Los Angeles. The temperature there can vary significantly depending on whether you are by the ocean, far inland, or near the mountains. No matter where a particular LA weather station is located, it cannont possibly be fully representative of the entire city. So, to get the best sense of an area's weather, consider these two suggestions:</p>

      <ol>
        <li><span className="about-list-highlight">Look at other weather stations in the same city:</span> Many cities have more than one NOAA weather station. The search results page links to the first weather station found in the city that meets the search criteria. If there are others, you will find a link to the other weather stations in the "Supplementary Information" section. Often times the stations will have similar weather values, but sometimes they can be quite different.</li>

        <li><span className="about-list-highlight">Look at other weather stations in the same metro area:</span> Many cities are part of a larger metro area. Looking at weather in the other cities in the same metro area is a great way to get a sense of an area's weather. If a city is part of a metro area, you will find a link to other cities in the same metro area in the "Supplementary Information" section. Not all cities belong to a metro area, and occasionally a city will belong to multiple metro areas. Also, while there is an official distinction between <a href="https://en.wikipedia.org/wiki/Metropolitan_statistical_area">Metropolitan</a> and <a href="https://en.wikipedia.org/wiki/Micropolitan_statistical_area">Micropolitan</a> areas, on this site they have been grouped together under the same "metro area" term.</li>
      </ol>
    </div>
  );
}

export default About;
