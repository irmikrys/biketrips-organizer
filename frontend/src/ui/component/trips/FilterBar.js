import React, {Component} from "react";
import Select from "react-select";

class FilterBar extends Component {

  handleSelectChange = (field, value) => {
    let currentSortCriteria = Object.assign(
      {}, this.props.filterCriteria, {[field]: value ? value : ""}
    );
    this.props.onChange(currentSortCriteria);
  };

  render() {
    return (
      <div className={this.props.className}>
        <div className="search-bar">
          <div className="search-bar-item">
            <Select simpleValue
                    placeholder="level"
                    clearable={false}
                    value={this.props.filterCriteria.idLevel}
                    options={Object.values(this.props.levels)
                      .map(level => {
                        return {value: level.idLevel, label: level.name}
                      })
                    }
                    onChange={this.handleSelectChange.bind(this, "idLevel")}
            />
          </div>
          <div className="search-bar-item">
            <Select simpleValue
                    placeholder="status"
                    clearable={false}
                    value={this.props.filterCriteria.idStatus}
                    options={Object.values(this.props.statuses)
                      .map(status => {
                        return {value: status.idStatus, label: status.name}
                      })
                    }
                    onChange={this.handleSelectChange.bind(this, "idStatus")}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default FilterBar;
