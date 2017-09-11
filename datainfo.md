

This file contains explanations and examples about the data files in the src/data directory.


-WEATHER.JSON (frequently used as const named stationsObj in the app): weather.json is a file of all stations and their weather data. It takes the form of:

{ station1: {info}, station2: {info}, etc. }


-EXAMPLE STATION IN WEATHER.JSON:

"USW00093044":{
  "zip":"87327",
  "city":"Zuni",
  "multiCity":[], // If multiple stations in same city then all stations listed in array
  "sharedarea":["Gallup, NM"], // Metro/micro areas that station belongs to that also contain at least one other station from another city.
  "state":"NM",
  "andSnGe1":"4.4", // Average # days snowfall >= 1 inch
  "andSnCGe1":"4.0", // Average # days snow ground cover >= 1 inch
  "andPrGe5Ti":"6.2", // Average # days with precipitation >= 1/2 inch (5 tenths of an inch)
  "mTmxAv":["48.8","52.6","59.9","68.2","77.4","87.3","90.2","87.3","82.0","70.8","58.3","49.0",90.2],
  "mTmnAv":["12.0","15.4","19.3","24.6","32.3","39.7","48.4","48.1","39.8","28.3","18.8","12.1",12],
    // For mTmx and mTmn [0]-[11] are jan-dec values, [12] is the max/min of those values
  "andTmnLe32":"217.3", // Average # days min temp <= 32 degrees.
  "andTmxGe60":"247.4", // Average # days temp gets to at least 60
  "andTmxGe80":"122.2" // Average # of days temp gets to at least 80
}


-WEATHER VALUES IN FOR EACH STATION IN STATIONSOBJ:

"mTmxAv"
"mTmnAv"
"andSnGe1"
"andSnCGe1"
"andPrGe5Ti"
"andTmnLe32"
"andTmxGe60"
"andTmxGe80"


-INPUTMINMAX.JSON: Object with properties being the weather range input options and the values being an array of the min, max, and default search values (on fresh load) for each range slider input. Min rounded down, max up. Default values are just values I chose that would return a smallish list of cities with comfortable weather in case the user just clicks "find matches" without changing the sliders at all.

{
  "hMTmxAvLe":[46,117,82],
  "lMTmnAvGe":[-27,73,23],
  "andSnGe1Le":[0,93,47],
  "andSnGe1Ge":[0,93,47],
  "andSnCGe1Le":[0,247,124],
  "andSnCGe1Ge":[0,247,124],
  "andPrGe5TiLe":[0,135,68],
  "andPrGe5TiGe":[0,135,68],
  "andTmnLe32Le":[0,308,154],
  "andTmnLe32Ge":[0,308,154],
  "andTmxGe60Le":[0,365,183],
  "andTmxGe60Ge":[0,365,183],
  "andTmxGe80Le":[0,365,183],
  "andTmxGe80Ge":[0,365,183]
}

-NAMING IN INPUTMINMAX
For many weather values I allow users to pick from a range, and so there are often 2 users values for each weather value. The Le/Ge (less/greater than or equal) added to the weather value names signify the two ends of the range that users will choose from. In this context:
Le = User desires value less than or equal to chosen value (the max allowable)
Ge = User desires value greater than or equal to chosen value (the min allowable)
Ex: If "andTmnLe32Le" had a value of 50, this means that the user wants the average number of days where the min temp is less than or equal to 32 degrees to be less than or equal to 50 days (no more than).

hMTmxAvLe
lMTmnAvGe
andSnGe1Le
andSnGe1Ge
andSnCGe1Le
andSnCGe1Ge
andPrGe5TiLe
andPrGe5TiGe
andTmnLe32Le
andTmnLe32Ge
andTmxGe60Le
andTmxGe60Ge
andTmxGe80Le
andTmxGe80Ge


-METROMAP.JSON: Using metro names as the properties, this breaks each metro area up into cities,
and breaks each city up into stations. This is helpful for creating metro area links:

{"metroname, state(s)": {city1: [station, station], city2: [station]}, etc.}


-WEATHEROPTIONS.JSON: A list of the weather options that are asked of the user (the same as the keys in inputminmax). In object form: { "weatherOptions: [list of options]"}.


-DEFAULTMATCHES.JSON: Precomputed list of matches for initial app load. Based off of the default values in inputminmax.


-NOTES ON UPDATING THE APP WITH NEW WEATHER INFO

In jsoncreate.js:

1) Add the data to stationsObj (SEE below note on naming)
2) Add the new data name to the section in jsoncreate.js that checks for stations with incomplete information.
3) Manually alter createminmax.js, createinputminmax.js, and finddefaultmatches.js with new info.
4) Run jsoncreate.js and copy over the 5 outputted files.

In the app:

1) Add new value to default state in App.
2) Update defaults in paramstovalues.js with new value.
3) Update findmatches.js with new value.
4) Add slider(s) for new value on search page.
5) Add to list of weather values on location.js.
6) Update data examples on this page with new value for future reference.

Note on naming: For the 'Not Important' button in the app I'm using a hack based on weather value name to make that function work. See slidergroup.js to see how that works and pick a name accordingly.
