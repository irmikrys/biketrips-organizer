import React, {Component} from 'react'
import UsersForm from '../../component/forms/UsersForm'

export default class TripUsersPage extends Component {

  submit = values => {
    // print the form values to the console
    console.log(values)
  };

  render() {
    return <UsersForm onSubmit={this.submit} />
  }
}
