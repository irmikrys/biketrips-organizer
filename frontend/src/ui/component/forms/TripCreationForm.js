import React, {Component} from "react";
import Select from "react-select";

export default class TripCreationForm extends Component {

  constructor(props) {
    super(props);
    this.props.fetchLevels();
  }

  state = {
    moderator: this.props.username,
    name: "",
    startDate: "",
    endDate: "",
    idLevel: "",
    idStatus: 1,
    description: "",
    points: ""
  };

  handleInputChange = event => {
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  handleLevelChange = value => {
    this.setState({idLevel: value})
  };

  render() {
    return (
      <div className="form-page" id="create-trip">
        <div className="form-container">
          <form>
            <input placeholder="name"
                   name="name"
                   onChange={this.handleInputChange}
                   required
            />
            <textarea placeholder="description..."
                      name="description"
                      onChange={this.handleInputChange}
                      cols="40"
                      rows="5"
                      required
            />
            <Select simpleValue
                    placeholder="level"
                    clearable={false}
                    value={this.state.idLevel}
                    onChange={this.handleLevelChange}
                    options={this.props.levels.map(item => {
                      return {value: item.idLevel, label: item.name}
                    })}
            />
            <input placeholder="points"
                   name="points"
                   onChange={this.handleInputChange}
                   required
            />
            <button type="submit">Create trip</button>
          </form>
        </div>
      </div>
    );
  }
}
