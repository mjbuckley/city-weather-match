import React from 'react';
import cityImage from '../city-image.png';

function HomeImage(props) {
  return (
    <img
      src={cityImage}
      width="250px"
      alt="A logo with buildings, a tree, and the sun."
      className={props.className}
    />
  );
}

export default HomeImage;
