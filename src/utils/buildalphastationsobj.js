import stationsObj from '../data/weather.json';


/**
 * Create an object that breaks deDupedMatches into alphabetical sections. Ex:
 * {a: [staion1, staion2], d: [station1], etc.}
 */
export default function buildAlphaStationsObj(deDupedMatches) {

  let alphaStationsObj = {};

  deDupedMatches.forEach(function(station) {
    const city = stationsObj[station]["c"];
    const firstLetter = city.charAt(0);

    if (alphaStationsObj[firstLetter]) {
      alphaStationsObj[firstLetter].push(station);
    } else {
      alphaStationsObj[firstLetter] = [station];
    }
  });

  return alphaStationsObj;
}
