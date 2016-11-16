

function AccordionList(props) {
  let accordionStyle = props.expanded ? {display: inherit} : {display: none};

  return (
    <li key={props.key} className={props.className}>
      <a onClick={props.onClick}>{props.anchorText}</a>
      <div style={accordionStyle} id={???}>
        {props.children}
      </div>
    </li>
  );
}

export default AccordionList;




// Expected props:
// 1) "stationObject", which looks like { stationID: info }
// 2) expanded: true/false
// 3) onclick function






function CityList(props) {

  const city = props.stationObject[Object.keys(props.stationObject)]["location"]["city"];
  const state = props.stationObject[Object.keys(props.stationObject)]["location"]["state"];
  const sharedArea = props.stationObject[Object.keys(props.stationObject)]["location"]["sharedarea"];
  const station = props.stationObject[Object.keys(props.stationObject)];
  const accordionStyle = props.expanded ? {display: inherit} : {display: none};

  const handleClick = props.onClick(station);

  return (
    <li key={station} className={CityList}>
      <a onClick={props.onClick}>{city}, {state}</a>
      <div style={accordionStyle}>
        <p>Some test text</p>
        {(sharedArea.length > 0) ? (
        <SharedAreaList sharedarea={sharedArea} />
        ) : null }
      </div>
    </li>
  );
}









// FOR REFERNCE


class CityResults extends Component {
  constructor() {
    super();
    this.citiesList = this.citiesList.bind(this);
  }

  // Remove duplicate city names from matches and then return matches for display
  citiesList() {
    let previousValue = "";

    return this.props.matches.filter(function(obj) {
      let cityValue = obj[Object.keys(obj)]["location"]["city"];
      let stateValue = obj[Object.keys(obj)]["location"]["state"];
      if ((cityValue + stateValue) !== previousValue) {
        previousValue = cityValue + stateValue;
        return true;
      } else {
        return false;
      }
    }).map(obj => (
      <CityList stationObject={obj} />
    ));
  }


removeGreeting() {
  this.props.removeGreeting(this.props.name);
};

render() {
  return (
    <div className="HelloWorld">
      {this.state.greeting} {this.props.name}!
      <br/>
      <button onClick={this.frenchify}>Frenchify!</button>
      <br/>
      <button onClick={this.removeGreeting}>Remove Me!</button>
    </div>
  );
};
};
