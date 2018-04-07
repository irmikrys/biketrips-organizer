import React, {Component} from 'react';

export class ApplicationRow extends Component {

  handleAcceptation = event => {
    event.preventDefault();
    const {acceptModer} = this.props;
    acceptModer(this.props.data.username, "MODER");
  };

  handleDeletion = event => {
    console.log('delete');
  };

  render() {
    const application = this.props.data;
    return (
      <tr className="application">
        <td/>
        <td id="date">{application.createDate}</td>
        <td id="username">{application.username}</td>
        <td id="email">{application.email}</td>
        <td id="action">
          <div className="btn-toolbar">
            <button type="button"
                    className="btn btn-group btn-xs btn-danger"
                    onClick={this.handleDeletion}
            >
              <span className="glyphicon glyphicon-trash" aria-hidden="true"/>
            </button>
            <button type="button"
                    className="btn btn-group btn-xs btn-default"
                    onClick={this.handleAcceptation}
            >
              <span className="glyphicon glyphicon-eye-open" aria-hidden="true"/>
            </button>
          </div>
        </td>
      </tr>
    )
  }
}
