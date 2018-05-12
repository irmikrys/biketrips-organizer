import React, {Component} from "react";
import Select from "react-select";

class FilterBar extends Component {

  LEVELS = [
    {value: '1', label: 'easy'},
    {value: '2', label: 'medium'},
    {value: '3', label: 'hard'},
  ];

  STATUSES = [
    {value: '1', label: 'active'},
    {value: '2', label: 'in progress'}
  ];

  SORT_BY_SELECT_OPTIONS = [
    {value: "endDate", label: `${String.fromCharCode(8593)} End Date`},
    {value: "endDate,desc", label: `${String.fromCharCode(8595)} End Date`},
    {value: "startDate", label: `${String.fromCharCode(8593)} Start Date`},
    {value: "startDate,desc", label: `${String.fromCharCode(8595)} Start Date`},
  ];

  constructor(props) {
    super(props);
    this.state = {
      level: null,
      status: null,
      sort: null
    }
  }

  handleSelectChange = (field, value) => {
    this.setState({[field] : value});
  };

  render() {
    return (
      <div className={this.props.className}>
        <div className="search-bar">
          <div className="search-bar-item">
            <Select simpleValue
                    name="level"
                    placeholder="level"
                    clearable={false}
                    value={this.state.level}
                    options={this.LEVELS}
                    onChange={this.handleSelectChange.bind(this, "level")}
            />
          </div>
          <div className="search-bar-item">
            <Select simpleValue
                    name="status"
                    placeholder="status"
                    clearable={false}
                    value={this.state.status}
                    options={this.STATUSES}
                    onChange={this.handleSelectChange.bind(this, "status")}
            />
          </div>
          <div className="search-bar-item">
            <Select simpleValue
                    placeholder="sort by"
                    clearable={false}
                    value={this.state.sort}
                    options={this.SORT_BY_SELECT_OPTIONS}
                    onChange={this.handleSelectChange.bind(this, "sort")}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default FilterBar;
