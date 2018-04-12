import React from 'react';
import {IndexRoute, Route} from 'react-router';

import privateRoute from './privateRoute';
import App from '../ui/container/App';
import UserProfilePage from '../ui/container/user/UserProfilePage';
import AdminLoginPage from '../ui/container/administrator/AdminLoginPage';
import RegisterPage from '../ui/container/RegisterPage';
import UserLoginPage from '../ui/container/UserLoginPage';
import WelcomePage from "../ui/container/WelcomePage";
import ApplicationsPage from "../ui/container/administrator/ApplicationsPage";
import ApplyPage from "../ui/container/user/ApplyPage";
import ModeratorPage from "../ui/container/moderator/ModeratorPage";
import NewTripPage from "../ui/container/moderator/NewTripPage"
import EpisodesFormPage from "../ui/container/moderator/EpisodesFormPage";
import ModeratorTripsPage from "../ui/container/moderator/ModeratorTripsPage";

export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={WelcomePage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="login" component={UserLoginPage}/>
    <Route path="admin-login" component={AdminLoginPage}/>
    <Route path="applications" component={privateRoute(ApplicationsPage)}/>
    <Route path="apply" component={privateRoute(ApplyPage)}/>
    <Route path="profile" component={UserProfilePage}/>
    <Route path="moderate" component={ModeratorPage}/>
    <Route path="moderate/create-trip" component={NewTripPage}/>
    <Route path="moderate/edit-episodes" component={EpisodesFormPage}/>
    <Route path="moderate/my-trips" component={ModeratorTripsPage}/>
    <Route path="logout" onEnter={onLogout}/>
  </Route>
);
