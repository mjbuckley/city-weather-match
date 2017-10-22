/**
 * Function to build page links. This adds weather values in query params to allow state to be
 * recreated if needed. Props are the weather values (although I generally just pass all props here
 * for simplicity), and path is the page link ("/results", etc.).
 */
export default function buildLink(props, path) {

  if (props.isActive) {
    return {
      pathname: path,
      query: props.weatherValues
    };
  } else {
    return path;
  }
}
