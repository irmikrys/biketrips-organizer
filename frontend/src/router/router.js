import React from 'react';
import {IndexRoute, Route} from 'react-router';

import privateRoute from './privateRoute';
import App from '../ui/container/App';
import UserProfilePage from '../ui/container/user/UserProfilePage';
import RegisterPage from '../ui/container/RegisterPage';
import LoginPage from '../ui/container/LoginPage';
import WelcomePage from "../ui/container/WelcomePage";
import ApplicationsPage from "../ui/container/administrator/ApplicationsPage";
import ApplyPage from "../ui/container/user/ApplyPage";
import NewTripPage from "../ui/container/moderator/NewTripPage"
import EpisodesFormPage from "../ui/container/moderator/EpisodesFormPage";
import ModeratorTripsPage from "../ui/container/moderator/ModeratorTripsPage";
import ParticipantsFormPage from "../ui/container/moderator/ParticipantsFormPage";

export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={WelcomePage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="applications" component={privateRoute(ApplicationsPage)}/>
    <Route path="apply" component={privateRoute(ApplyPage)}/>
    <Route path="profile" component={UserProfilePage}/>
    <Route path="moderate/create-trip" component={NewTripPage}/>
    <Route path="moderate/edit-episodes" component={EpisodesFormPage}/>
    <Route path="moderate/edit-participants" component={ParticipantsFormPage}/>
    <Route path="moderate/my-trips" component={ModeratorTripsPage}/>
    <Route path="logout" onEnter={onLogout}/>
  </Route>
);
