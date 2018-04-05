import React, {Component} from 'react';

export class Applications extends Component {


  render() {
    const {applications} = this.props;
    return (
      <div className="applications-container">
        {
          applications.map(application =>
            <div className="application" key={application.username}>
              <table>
                <tbody>
                <tr>
                  <td id="username">{application.username}</td>
                  <td id="email">{application.email}</td>
                  <td id="action">
                    <span className="glyphicon glyphicon-ok"/>
                    <span className="glyphicon glyphicon-remove"/>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    )
  }
}
