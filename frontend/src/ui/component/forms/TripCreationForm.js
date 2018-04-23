import React, {Component} from "react";
import Select from "react-select";
import {DateRangePicker} from "react-dates";
import 'react-dates/initialize';

export default class TripCreationForm extends Component {

  constructor(props) {
    super(props);
    this.props.fetchLevels();
    this.state = {
      moderator: this.props.username,
      name: "",
      startDate: null,
      endDate: null,
      idLevel: "",
      idStatus: 1,
      description: "",
      points: "",
      focusedInput: null
    };
  }

  handleInputChange = event => {
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  handleLevelChange = value => {
    this.setState({idLevel: value})
  };

  handleSubmit = event => {
    event.preventDefault();
    const {create} = this.props;
    create(this.state);
  };

  render() {
    return (
      <div className="form-page" id="create-trip">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <DateRangePicker startDate={this.state.startDate}
                             startDateId="start_date_id"
                             endDate={this.state.endDate}
                             endDateId="end_date_id"
                             onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                             focusedInput={this.state.focusedInput}
                             onFocusChange={focusedInput => this.setState({ focusedInput })}
                             noBorder={true}
                             small={true}
                             hideKeyboardShortcutsPanel={true}
                             startDatePlaceholderText="start date"
                             endDatePlaceholderText="end date"
                             required
            />
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
                    required
            />
            <input placeholder="points"
                   name="points"
                   pattern="[1-9].[0-9]{0,2}"
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
