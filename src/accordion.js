import React from 'react';


function Accordion(props) {
  let accordionStyle = props.expanded ? {display: inherit} : {display: none};

  return (
    <li key={props.station} className="CityList">
      <a onClick={props.toggle}>{props.city}, {props.state}</a>
      <Accordion style={accordionStyle} onClick={props.onClick} id={???}>
        <p>Some test text</p>
        {(props.sharedarea.length > 0) ? (
          <SharedAreaList sharedarea={props.sharedarea} />
        ) : null }
      <Accordion/>
    </li>
  );
}

export default Accordion;



<Accordion
  id=station
  onClick=this.toggle
  style=this.state.display[station]

/>


{ station: t/f, station: t/f, etc. }
toggle(evt) {
  this.setState.display = {};

}


<li>
  <a onClick={props.toggle}>{props.city}, {props.state}</a>
  <div>
    <p>Some test text</p>
    {(props.sharedarea.length > 0) ? (
      <SharedAreaList sharedarea={props.sharedarea} />
    ) : null }
  </div>
</li>









expanded: t/f
onClick: onClick
station: station


function Accordion(props) {
  let accordionStyle = props.expanded ? {display: inherit} : {display: none};

  return (
    <li key={props.station} className="CityList">
      <a onClick={props.toggle}>{props.city}, {props.state}</a>
      <Accordion style={accordionStyle} onClick={props.onClick} id={???}>
        <p>Some test text</p>
        {(props.sharedarea.length > 0) ? (
          <SharedAreaList sharedarea={props.sharedarea} />
        ) : null }
      <Accordion/>
    </li>
  );
}

export default Accordion;
