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
import EditTripPage from "../ui/container/moderator/EditTripPage";
import TripsPage from "../ui/container/user/TripsPage";
import TripViewPage from "../ui/container/user/TripViewPage";
import ContactPage from "../ui/container/ContactPage";
import AboutPage from "../ui/container/AboutPage";
import AlbumsPage from "../ui/container/user/AlbumsPage";


export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={WelcomePage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="applications" component={privateRoute(ApplicationsPage)}/>
    <Route path="apply" component={privateRoute(ApplyPage)}/>
    <Route path="profile" component={privateRoute(UserProfilePage)}/>
    <Route path="create-trip" component={privateRoute(NewTripPage)}/>
    <Route path="edit-episodes" component={privateRoute(EpisodesFormPage)}/>
    <Route path="edit-participants" component={privateRoute(ParticipantsFormPage)}/>
    <Route path="edit-trip/:idTrip" component={privateRoute(EditTripPage)}/>
    <Route path="moderator-trips" component={ModeratorTripsPage}/>
    <Route path="trips" component={TripsPage}/>
    <Route path="trips/:idTrip" component={TripViewPage}/>
    <Route path="trips/:idTrip/albums" component={AlbumsPage}/>
    <Route path="contact" component={ContactPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="logout" onEnter={onLogout}/>
  </Route>
);
