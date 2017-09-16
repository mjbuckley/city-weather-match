# City Weather Match

This Github repository contains the code for the [City Weather Match](http://www.cityweathermatch.com) website. [City Weather Match](http://www.cityweathermatch.com) helps users find the cities that match their personal weather preferences. After entering information about their preferred weather, the site searches data on nearly 4000 NOAA weather stations to find the locations that are a match for them. To find the cities that are a match for you, [visit the site now](http://www.cityweathermatch.com). If you are looking to see how the site works, continue reading below.


## Data

The bulk of the data used on the site comes from the National Oceanic and Atmospheric Administration's (NOAA) [1981-2010 Climate Normals](https://www.ncdc.noaa.gov/data-access/land-based-station-data/land-based-datasets/climate-normals/1981-2010-normals-data). That information has been refined and restructured into the five JSON files located in the data directory. Most of the information is contained in weather.json. The other four files are helper files that contain precomputed values used frequently on the site. A complete description of these files can be found in [datainfo.md](https://github.com/mjbuckley/city-weather-match/datainfo.md). The code that creates these files is located in a separate repo called [Format Weather Data](https://github.com/mjbuckley/format-weather-data). Visit that repo to see how the files were created and for additional information about the data sources. See App.js itself for more info.


## Useage

To run a copy of the site locally, just clone the repo and then run:
```
npm install
```
The project can be viewed on a development server at localhost:3000 by running:
```
npm start
```
The project was built using [Create-React-App](https://github.com/facebookincubator/create-react-app). View the documentation on that site for more commands and options.


## Code Notes

City Weather Match is a single page app built in React and with routing handled by React Router. Most of the code is well documented and fairly standard React, but there are a few important things worth mentioning to help approach the code for the first time. The entry point for the app is at index.js. This is where React Router handles the routing. All routes on the site are children of the App.js component. There are three values in App's state. They are passed down to all children, and they functions as a sort of global state for the entire site. These values are:

- **weatherValues:** An object with the names and values of the desired weather chosen by the user. Default values are set if the user has not yet chosen values.
- **matches:** An array of IDs of the weather stations that match the user's weather preferences. Default matches (based on default weatherValues) are set if user has not yet selected desired weather values.
- **isActive:** Set to true or false depending on whether or not the user has selected desired weather values.

When isActive is true, query parameters are added to every link on the site. These query parameters contain the information needed to recreate the global App state. This allows for pages to be bookmarked, the browser back button to be used, and the history to be accessed without losing App's state. The simplified version of how this works is that App looks for query parameters in componentWillMount and componentWillReceiveProps and then checks them against the current weatherValues. If they differ from the current values in state, then the matches are recalculated.


## Additional Information

- In addition to the comments in the code itself, a more generalized set of notes and reminders about the code in the app can be found in [notes.md](https://github.com/mjbuckley/city-weather-match/notes.md).
- The [todo.md](https://github.com/mjbuckley/city-weather-match/todo.md) file is a collection ideas of possible features to add and changes to make in the future.
