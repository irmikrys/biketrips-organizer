import React, {Component} from 'react';

export class ApplicationRow extends Component {

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
            <button type="button" className="btn btn-group btn-xs btn-danger">
              <span className="glyphicon glyphicon-trash" aria-hidden="true"/>
            </button>
            <button type="button" className="btn btn-group btn-xs btn-default">
              <span className="glyphicon glyphicon-eye-open" aria-hidden="true"/>
            </button>
          </div>
        </td>
      </tr>
    )
  }
}
