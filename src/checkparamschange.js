// import checkParams from './checkparams.js';

// React Router does not treat a change in query params as a new mounting of the component, so
// doing something like navigating to a bookmarked results page from a current results page would
// not change the results. This function is run from componentWillReceiveProps and it checks if the
// query param values (which are props) have changed and then calls checkparams.js if needed to
// determine the needed state changes.
// export default function checkParamsChange(nextProps, props) {

  // This can almost certainly be done better than this, but I need to look in to how JS handles
  // accessing non-existent object properties. Also, would be good to do this in a way to not need
  // to remember to alter this every time I add a weather value.
  // console.log(nextProps);
  // console.log(props);

  // Problem: there are alway weather values in state. A url without query params will always
  // cause a problem because it will never match the values in state. Need to do something where I
  // check for clicked's value and do something different there. Not below, but a start:
  // if (Object.keys(nextProps.location.query).length === 0 ) && props.clicked === false) {}

  // if (!nextProps.location.query) { console.log("1");}
  // if(  Object.keys(nextProps.location.query).length === 0 ) { console.log("2");}
  // if(!nextProps.location.query.mTmxAv ) { console.log("3");}
  // if(nextProps.location.query.mTmxAv !== props.location.query.mTmxAv ) { console.log("4");}
  // if(!nextProps.location.query.mTmnAv ) { console.log("5");}
  // if(nextProps.location.query.mTmnAv !== props.location.query.mTmnAv ) { console.log("6");}
  // if(!nextProps.location.query.andTmnLe32) { console.log("7");}
  // if(nextProps.location.query.andTmnLe32 !== props.location.query.andTmnLe32) { console.log("8");}
  // if(!nextProps.location.query.andSnGe1) { console.log("9");}
  // if(nextProps.location.query.andSnGe1 !== props.location.query.andSnGe1) { console.log("10");}
  // if(!nextProps.location.query.andPrGe5Ti) { console.log("11");}
  // if(nextProps.location.query.andPrGe5Ti !== props.location.query.andPrGe5Ti) { console.log("12");}
  //
  // if (nextProps.location.query.mTmxAv !== props.location.query.mTmxAv ||
  //     nextProps.location.query.mTmnAv !== props.location.query.mTmnAv ||
  //     nextProps.location.query.andTmnLe32 !== props.location.query.andTmnLe32 ||
  //     nextProps.location.query.andSnGe1 !== props.location.query.andSnGe1 ||
  //     nextProps.location.query.andPrGe5Ti !== props.location.query.andPrGe5Ti
  // ) {
  //   return true;
  // } else {
  //   return false;
  // }


// Good 3/8/17

//   if (nextProps.location.query.mTmxAv !== props.mTmxAv ||
//       nextProps.location.query.mTmnAv !== props.mTmnAv ||
//       nextProps.location.query.andTmnLe32 !== props.andTmnLe32 ||
//       nextProps.location.query.andSnGe1 !== props.andSnGe1 ||
//       nextProps.location.query.andPrGe5Ti !== props.andPrGe5Ti
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }


// Goodish 3/6/17

// import checkParams from './checkparams.js';
//
// // React Router does not treat a change in query params as a new mounting of the component, so
// // doing something like navigating to a bookmarked results page from a current results page would
// // not change the results. This function is run from componentWillReceiveProps and it checks if the
// // query param values (which are props) have changed and then calls checkparams.js if needed to
// // determine the needed state changes.
// export default function checkParamsChange(nextProps, props) {
//
//   // This can almost certainly be done better than this, but I need to look in to how JS handles
//   // accessing non-existent object properties. Also, would be good to do this in a way to not need
//   // to remember to alter this every time I add a weather value.
//
//   if (!nextProps.location.query) { console.log("1");}
//   if(  Object.keys(nextProps.location.query).length === 0 ) { console.log("2");}
//   if(!nextProps.location.query.mTmxAv ) { console.log("3");}
//   if(nextProps.location.query.mTmxAv !== props.location.query.mTmxAv ) { console.log("4");}
//   if(!nextProps.location.query.mTmnAv ) { console.log("5");}
//   if(nextProps.location.query.mTmnAv !== props.location.query.mTmnAv ) { console.log("6");}
//   if(!nextProps.location.query.andTmnLe32) { console.log("7");}
//   if(nextProps.location.query.andTmnLe32 !== props.location.query.andTmnLe32) { console.log("8");}
//   if(!nextProps.location.query.andSnGe1) { console.log("9");}
//   if(nextProps.location.query.andSnGe1 !== props.location.query.andSnGe1) { console.log("10");}
//   if(!nextProps.location.query.andPrGe5Ti) { console.log("11");}
//   if(nextProps.location.query.andPrGe5Ti !== props.location.query.andPrGe5Ti) { console.log("12");}
//
//   if (nextProps.location.query.mTmxAv !== props.location.query.mTmxAv ||
//       nextProps.location.query.mTmnAv !== props.location.query.mTmnAv ||
//       nextProps.location.query.andTmnLe32 !== props.location.query.andTmnLe32 ||
//       nextProps.location.query.andSnGe1 !== props.location.query.andSnGe1 ||
//       nextProps.location.query.andPrGe5Ti !== props.location.query.andPrGe5Ti
//   ) {
//     console.log("CPC");
//     checkParams(nextProps);
//   }
// }


// Goodish 2/24

// export default function checkParamsChange(nextProps, props) {
//
//   // This can almost certainly be done better than this, but I need to look in to how JS handles
//   // accessing non-existent object properties. Also, would be good to do this in a way to not need
//   // to remember to alter this every time I add a weather value.
//   if (!nextProps.location.query ||
//       Object.keys(nextProps.location.query).length === 0 ||
//       !nextProps.location.query.mTmxAv ||
//       nextProps.location.query.mTmxAv !== props.location.query.mTmxAv ||
//       !nextProps.location.query.mTmnAv ||
//       nextProps.location.query.mTmnAv !== props.location.query.mTmnAv ||
//       !nextProps.location.query.andTmnLe32 ||
//       nextProps.location.query.andTmnLe32 !== props.location.query.andTmnLe32 ||
//       !nextProps.location.query.snow ||
//       nextProps.location.query.snow !== props.location.query.snow ||
//       !nextProps.location.query.andPrGe5Ti ||
//       nextProps.location.query.andPrGe5Ti !== props.location.query.andPrGe5Ti
//   ) {
//     console.log("CPC");
//     checkParams(nextProps);
//   }
// }

// Convert nextProps to int?


// Old working version
//
// export default function checkParamsChange(nextProps, props) {
//
//   if (nextProps.location.query.mTmxAv !== props.location.query.mTmxAv ||
//       nextProps.location.query.mTmnAv !== props.location.query.mTmnAv ||
//       nextProps.location.query.andTmnLe32 !== props.location.query.andTmnLe32 ||
//       nextProps.location.query.snow !== props.location.query.snow ||
//       nextProps.location.query.andPrGe5Ti !== props.location.query.andPrGe5Ti
//   ) {
//     let info = {
//       mTmxAv: nextProps.location.query.mTmxAv,
//       mTmnAv: nextProps.location.query.mTmnAv,
//       andTmnLe32: nextProps.location.query.andSnGe1,
//       andSnGe1: nextProps.location.query.andPrGe5Ti,
//       andPrGe5Ti: nextProps.location.query.andTmnLe32
//     };
//     const matches = findMatches(info);
//     info["matches"] = matches;
//
//     props.updateWeatherState(info);
//   }
// }


// IMPORTANT 3/8/17
// Need to fix this. in will receive props it needs to check next.location.query[option].
// Guess I'll need two functions. Also, what about clicked?
// Also, note that what I'm doing should be ok even if query params empty. JS returns undefined
// for non-existent properties, not an error (I think this is different for deeply nest non-existent properties
// but for my app all properties I'm checking are surface layer).

import weatherOptions from './data/weatheroptions.js';

export default function checkParamsChange(next, current) {

  let mismatch = false;

  weatherOptions.forEach(function(option) {
    if (next[option] !== current[option]) {
      mismatch = true;
    }
  });

  return mismatch;
}
