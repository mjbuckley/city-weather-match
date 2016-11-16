class CitiesList extends Component {
  constructor() {
    super();
    this.state = {
      expanded: null
    };
//bind handle click func
  }

  //add handle click func

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


  
this.props.matches.map(obj => (<CityList stationObject={obj} />));

  render() {
    return (
      <ul>
        {this.citiesList()}
      </ul>
    );
  }
}

export default CitiesList;
