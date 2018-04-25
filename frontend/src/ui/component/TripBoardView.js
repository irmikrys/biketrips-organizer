import React, {Component} from "react";

export default class TripBoardView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      idTrip: "",
      idStatus: "",
      description: ""
    };
  }

  render() {
    return (
        <div className="trips-container">

      </div>
    );
  }
}
