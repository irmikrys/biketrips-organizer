import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import authentication from './authentication/authentication';
import register from './user/register';
import user from "./user/user";
import apply from "./applications/apply";
import activeApplications from "./applications/activeApplications";
import acceptModerator from "./applications/acceptModerator";
import deactivateApplication from "./applications/deactivateApplication";
import levels from "./trips/levels";
import tripCreation from "./trips/tripCreation";
import episodes from "./episodes/episodes";
import trips from "./trips/trips";
import episode from "./episodes/episode";
import trip from "./trips/trip";
import tripUpdate from "./trips/tripUpdate";
import participants from "./participants/participants";
import statuses from "./trips/statuses";
import participantUpdate from "./participants/participantUpdate";
import activities from "./participants/activities";
import createEpisode from "./episodes/createEpisode";
import fetchComments from "./comments/fetchComments";
import addComment from "./comments/addComment";
import commentDelete from "./comments/commentDelete";
import tripsArchive from "./trips/tripsArchive";
import tripsActive from "./trips/tripsActive";
import albums from "./albums/albums";
import createAlbum from "./albums/createAlbum";
import photos from "./photos/photos";
import addPhoto from "./photos/addPhoto";
import editProfile from "./user/editProfile";
import album from "./albums/album";

export default combineReducers({
  authentication,
  register,
  user,
  apply,
  activeApplications,
  acceptModerator,
  deactivateApplication,
  levels,
  tripCreation,
  episodes,
  trips,
  episode,
  trip,
  tripUpdate,
  tripsArchive,
  tripsActive,
  participants,
  statuses,
  participantUpdate,
  activities,
  createEpisode,
  fetchComments,
  addComment,
  commentDelete,
  albums,
  createAlbum,
  photos,
  addPhoto,
  editProfile,
  album,
  routing
});
