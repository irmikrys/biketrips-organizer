import React from 'react'
import {Field, reduxForm} from 'redux-form'

let UsersForm = props => {
  const {handleSubmit} = props;
  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <Field name="inputName" component="input" type="text"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

UsersForm = reduxForm({
  form: 'users'
})(UsersForm);

export default UsersForm;
