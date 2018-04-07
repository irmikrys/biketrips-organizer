import React from 'react';
import {IndexRoute, Redirect, Route} from 'react-router';

import privateRoute from './privateRoute';
import App from '../ui/container/App';
import UserProfilePage from '../ui/container/UserProfilePage';
import AdminLoginPage from '../ui/container/AdminLoginPage';
import RegisterPage from '../ui/container/RegisterPage';
import UserLoginPage from '../ui/container/UserLoginPage';
import WelcomePage from "../ui/container/WelcomePage";
import ApplicationsPage from "../ui/container/ApplicationsPage";
import ApplyPage from "../ui/container/ApplyPage";

export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={WelcomePage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="login" component={UserLoginPage}/>
    <Route path="admin_login" component={AdminLoginPage}/>
    <Route path="applications" component={privateRoute(ApplicationsPage)}/>
    <Route path="apply" component={privateRoute(ApplyPage)}/>
    <Route path="profile" component={privateRoute(UserProfilePage)}/>
    <Route path="logout" onEnter={onLogout}/>
  </Route>
);
