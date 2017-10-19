import React from 'react';
import cityImage from '../city-image.svg';

function HomeImage(props) {
  return (
    <img
      src={cityImage}
      width="250px"
      height="167px"
      alt="A blue and white illustration of city buildings, a tree, and the sun."
      className={props.className}
    />
  );
}

export default HomeImage;
