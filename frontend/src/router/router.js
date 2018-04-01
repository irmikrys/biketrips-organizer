import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from '../ui/container/App';
import UserProfile from '../ui/container/UserProfile';
import AdminLoginPage from '../ui/container/AdminLoginPage';
import RegisterPage from '../ui/container/RegisterPage';
import UserLoginPage from '../ui/container/UserLoginPage';
import privateRoute from './privateRoute';

export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={UserLoginPage}/>
    <Route path="profile" component={privateRoute(UserProfile)}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="login" component={AdminLoginPage}/>
    <Route path="logout" onEnter={onLogout}/>
  </Route>
);
