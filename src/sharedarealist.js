import React from 'react';
import { Link } from 'react-router'


// Need to figure out the metro area disambiguation page and decide what props to pass there.
// Also need to figure out how to deal with metro areas with the same name (ex: Columbus).
// Iniitial test version. Eventually need to link to metro area disambiguation page.
function SharedAreaList(props) {

  if (props.sharedarea.length > 1) {

    return (
      <div className="SharedAreaList">
        <h4>{props.city} is part of the following urban areas:</h4>
        <ul>
          {props.sharedarea.map(function(area, index) {
            let link = "/metro-areas/" + area;
            return (<li key={index}><Link to={link}>{area}</Link></li>);
            }
          )}
        </ul>
      </div>
    );
  } else {
    let link = "/metro-areas/" + props.sharedarea[0];
    return (
      <div className="SharedAreaList">
        <h4>{props.city} is part of the <Link to={link}>{props.sharedarea[0]}</Link> urban area</h4>
      </div>
    );
  }
}

export default SharedAreaList;

// <ul>
//   {props.sharedarea.map((area, index) => (
//     <li key={index}><Link to="/fake">{area}</Link>}</li>
//   ))}
// </ul>


// Below is a working version before I started messing with shared area links

// function SharedAreaList(props) {
//
//   return (
//     <div className="SharedAreaList">
//
//       {(props.sharedarea.length > 1) ? (
//         <div>
//           <h4>{props.city} is part of the following urban areas:</h4>
//           <ul>
//             {props.sharedarea.map((area, index) => (
//               <li key={index}>{area}</li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <div>
//           <h4>{props.city} is part of the {props.sharedarea[0]} urban area</h4>
//         </div>
//       )}
//
//     </div>
//   );
// }
