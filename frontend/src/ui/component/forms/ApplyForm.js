import React, { Component } from 'react';
import {ErrorPanel} from "./ErrorPanel";
import {
  EMAIL,
  USERNAME,
  getFormField
} from "../../constants/constants";

export default class ApplyForm extends Component {

  state = {
    [EMAIL]:  "",
    [USERNAME]: ""
  };

  handleInputChange = event => {
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  render() {
    const {errorMessage} = this.props;
    const errorPanel = errorMessage ? <ErrorPanel messageKey={errorMessage}/> : null;
    return (
      <div className="form-page" id="apply">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            {errorPanel}
            {
              [USERNAME, EMAIL].map(fieldKey => {
                const field = getFormField(fieldKey);
                return <input key={field.name}
                              type={field.type}
                              placeholder={field.placeholder}
                              name={field.name}
                              pattern={field.pattern}
                              onChange={this.handleInputChange}
                              required
                />
              })
            }
            <button type="submit">Apply</button>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { apply } = this.props;
    apply(this.state);
  }
}
