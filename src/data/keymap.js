// Map from weather terms as used in this App to weather terms used in weather.json.
// This is a temporary measure. Eventually I will just make sure the two locations have
// the same naming scheme.

const keyMap = {
  maxTemp: "mlyTMaxAvg",
  lowTemp: "mlyTMinAvg",
  below32: "daysBelow32",
  snowfall: "annInchPlus",
  precip: "annprcpge050hi"
};

export default keyMap;
