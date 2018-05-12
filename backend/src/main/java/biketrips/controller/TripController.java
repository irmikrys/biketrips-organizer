package biketrips.controller;

import biketrips.dto.*;
import biketrips.dto.session.UserSession;
import biketrips.exceptions.TripException;
import biketrips.model.*;
import biketrips.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class TripController {

  private final TripService tripService;

  private final UserService userService;

  private final StatusService statusService;

  private final LevelService levelService;

  private final ActivityService activityService;

  private final EpisodeService episodeService;

  private final LocationService locationService;

  private final ParticipantService participantService;

  private final CommentService commentService;

  private final AlbumService albumService;

  private final PhotoService photoService;

  @Autowired
  public TripController(@Qualifier("tripService") TripService tripService,
                        @Qualifier("userService") UserService userService,
                        @Qualifier("statusService") StatusService statusService,
                        @Qualifier("levelService") LevelService levelService,
                        @Qualifier("activityService") ActivityService activityService,
                        @Qualifier("episodeService") EpisodeService episodeService,
                        @Qualifier("locationService") LocationService locationService,
                        @Qualifier("participantService") ParticipantService participantService,
                        @Qualifier("commentService") CommentService commentService,
                        @Qualifier("albumService") AlbumService albumService,
                        @Qualifier("photoService") PhotoService photoService) {
    this.tripService = tripService;
    this.userService = userService;
    this.statusService = statusService;
    this.levelService = levelService;
    this.activityService = activityService;
    this.episodeService = episodeService;
    this.locationService = locationService;
    this.participantService = participantService;
    this.commentService = commentService;
    this.albumService = albumService;
    this.photoService = photoService;
  }


  // trips


  @RequestMapping(method = GET, path = "/api/activities")
  public @ResponseBody
  Iterable<Activity>
  getAllActivities() {
    return this.activityService.findAll();
  }

  @RequestMapping(method = GET, path = "/api/activities/user")
  public @ResponseBody
  Iterable<Activity>
  getActivitiesForUser() {
    List<Activity> activitiesForUser = new ArrayList<>();
    Iterable<Activity> activities = this.getAllActivities();
    for (Activity a :
      activities) {
      if (a.getIdActivity() == 4) continue;
      activitiesForUser.add(a);
    }
    return activitiesForUser;
  }

  @RequestMapping(method = GET, path = "/api/statuses")
  public @ResponseBody
  Iterable<Status>
  getAllStatuses() {
    return this.statusService.findAll();
  }

  @RequestMapping(method = GET, path = "/api/levels")
  public @ResponseBody
  Iterable<Level>
  getAllLevels() {
    return this.levelService.findAll();
  }

  @RequestMapping(method = GET, path = "/api/trips")
  public @ResponseBody
  Iterable<Trip>
  getAllTrips() {
    return this.tripService.findAll();
  }

  @RequestMapping(method = POST, path = "/api/trips")
  public @ResponseBody
  ResponseEntity<Trip>
  createTrip(@Valid @RequestBody TripDTO tripDTO, HttpSession session) {
    getModeratorAndCheck(session, "createTrip");
    Level level = levelService.findByIdLevel(tripDTO.getIdLevel()).orElseThrow(
      () -> new TripException("createTrip.error.levelNotFound"));
    Status status = statusService.findByIdStatus(tripDTO.getIdStatus()).orElseThrow(
      () -> new TripException("createTrip.error.statusNotFound"));
    Trip trip = this.tripService.createTrip(tripDTO);
    return ResponseEntity.ok(trip);
  }

  @RequestMapping(method = GET, path = "/api/trips/{idTrip}")
  public @ResponseBody
  ResponseEntity<TripDTO>
  getTrip(@PathVariable("idTrip") long idTrip) {
    Trip trip = getTripAndCheck(idTrip, "getTrip");
    TripDTO tripDTO = new TripDTO(trip);
    return ResponseEntity.ok(tripDTO);
  }

  @RequestMapping(method = PUT, path = "/api/trips/{idTrip}")
  public @ResponseBody
  ResponseEntity<HttpStatus>
  updateTrip(@PathVariable(name = "idTrip") long idTrip,
             @Valid @RequestBody TripDTO tripDTO,
             HttpSession session) {
    String action = "updateTrip";
    User user = getModeratorAndCheck(session, action);
    Trip trip = getTripAndCheck(idTrip, action);
    checkIfModeratorIsOwner(user, trip, action);
    this.tripService.updateTrip(trip, tripDTO);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = GET, path = "/api/moderator/trips")
  public @ResponseBody
  Iterable<Trip>
  getTripsByModerator(@RequestParam(name = "idLevel", defaultValue = "%") String idLevel,
                      @RequestParam(name = "idStatus", defaultValue = "%") String idStatus,
                      HttpSession session) {
    User user = getModeratorAndCheck(session, "getTripsByModerator");
    return this.tripService.findAllByParams(idLevel, idStatus, user.getUsername());
  }


  //episodes


  @RequestMapping(method = POST, path = "/api/trips/{idTrip}/episodes")
  public @ResponseBody
  ResponseEntity<Episode>
  createEpisode(@PathVariable(name = "idTrip") long idTrip,
                @Valid @RequestBody EpisodeDTO episodeDTO,
                HttpSession session) {
    String action = "createEpisode";
    if (idTrip != episodeDTO.getIdTrip()) {
      throw new TripException(action + ".error.wrongTrip");
    }
    Trip trip = getTripAndCheck(idTrip, action);
    User user = getModeratorAndCheck(session, action);
    checkIfModeratorIsOwner(user, trip, action);
    Iterable<Episode> tripEpisodes = getTripEpisodes(idTrip, action);
    for (Episode episode :
      tripEpisodes) {
      //fixme different formats
      System.out.println("Episode time: " + episode.getTime());
      System.out.println("EpisodeDTO time: " + episodeDTO.getTime());
      if (episode.getTime().equals(episodeDTO.getTime())) {
        throw new TripException(action + ".error.ambiguousTime");
      }
    }
    Episode episode = this.episodeService.createEpisode(episodeDTO);
    return ResponseEntity.ok(episode);
  }

  @RequestMapping(method = GET, path = "/api/trips/{idTrip}/episodes")
  public @ResponseBody
  Iterable<EpisodeDTO>
  getEpisodesByIdTrip(@PathVariable(name = "idTrip") long idTrip) {
    Iterable<Episode> episodes = getTripEpisodes(idTrip, "getTripEpisodes");
    List<EpisodeDTO> episodesDTO = new ArrayList<>();
    for (Episode episode :
      episodes) {
      Location location = this.locationService.findByIdLocation(episode.getIdLocation()).orElseThrow(
        () -> new TripException("getTripEpisodes.error.locationNotFound")
      );
      episodesDTO.add(new EpisodeDTO(episode, location));
    }
    return episodesDTO;
  }

  @RequestMapping(method = GET, path = "/api/trips/{idTrip}/episodes/{idEpisode}")
  public ResponseEntity<EpisodeDTO>
  getEpisode(@PathVariable(name = "idTrip") long idTrip,
             @PathVariable(name = "idEpisode") long idEpisode) {
    String action = "getEpisode";
    Trip trip = getTripAndCheck(idTrip, action);
    Episode episode = getEpisodeAndCheck(idEpisode, idTrip, action);
    Location location = getLocationAndCheck(episode, action);
    EpisodeDTO episodeDTO = new EpisodeDTO(episode, location);
    return ResponseEntity.ok(episodeDTO);
  }

  @RequestMapping(method = PUT, path = "/api/trips/{idTrip}/episodes/{idEpisode}")
  public @ResponseBody
  ResponseEntity<HttpStatus>
  updateEpisode(@PathVariable(name = "idTrip") long idTrip,
                @PathVariable(name = "idEpisode") long idEpisode,
                @Valid @RequestBody EpisodeDTO episodeDTO,
                HttpSession session) {
    String action = "updateEpisode";
    User user = getModeratorAndCheck(session, action);
    Trip trip = getTripAndCheck(idTrip, action);
    checkIfModeratorIsOwner(user, trip, action);
    Episode episode = getEpisodeAndCheck(idEpisode, idTrip, action);
    Location location = getLocationAndCheck(episode, action);
    this.episodeService.updateEpisode(episode, location, episodeDTO);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = DELETE, path = "/api/trips/{idTrip}/episodes/{idEpisode}")
  public @ResponseBody
  ResponseEntity<HttpStatus>
  deleteEpisode(@PathVariable(name = "idTrip") long idTrip,
                @PathVariable(name = "idEpisode") long idEpisode,
                HttpSession session) {
    String action = "deleteEpisode";
    User user = getModeratorAndCheck(session, action);
    Trip trip = getTripAndCheck(idTrip, action);
    checkIfModeratorIsOwner(user, trip, action);
    Episode episode = getEpisodeAndCheck(idEpisode, idTrip, action);
    this.episodeService.deleteEpisode(episode.getIdEpisode(), episode.getIdLocation());
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = GET, path = "/api/episodes")
  public @ResponseBody
  Iterable<Episode>
  getAllEpisodes() {
    return this.episodeService.findAll();
  }


  //participants


  @RequestMapping(method = POST, path = "/api/trips/{idTrip}/participants")
  public @ResponseBody
  ResponseEntity<Participant>
  addParticipant(@PathVariable(name = "idTrip") long idTrip,
                 @Valid @RequestBody ParticipantDTO participantDTO,
                 HttpSession session) {
    String action = "addParticipant";
    if (idTrip != participantDTO.getIdTrip()) {
      throw new TripException(action + ".error.wrongTrip");
    }
    Trip trip = getTripAndCheck(idTrip, action);
    User user = getModeratorAndCheck(session, action);
    checkIfModeratorIsOwner(user, trip, action);
    User participantUser = this.userService.findByUsername(participantDTO.getUsername()).orElseThrow(
      () -> new TripException(action + ".error.userNotFound")
    );
    Iterable<Participant> tripParticipants = getTripParticipants(idTrip, action);
    for (Participant participant :
      tripParticipants) {
      if (participant.getUsername().equals(participantDTO.getUsername())) {
        throw new TripException(action + ".error.userAlreadyAdded");
      }
    }
    Participant participant = this.participantService.createParticipant(participantDTO);
    return ResponseEntity.ok(participant);
  }

  @RequestMapping(method = GET, path = "/api/trips/{idTrip}/participants")
  public @ResponseBody
  Iterable<Participant>
  getParticipantsByIdTrip(@PathVariable(name = "idTrip") long idTrip) {
    return getTripParticipants(idTrip, "getTripParticipants");
  }

  @RequestMapping(method = GET, path = "/api/trips/{idTrip}/participants/{username}")
  public ResponseEntity<ParticipantDTO>
  getParticipant(@PathVariable(name = "idTrip") long idTrip,
                 @PathVariable(name = "username") String username) {
    String action = "getParticipant";
    Trip trip = getTripAndCheck(idTrip, action);
    Participant participant = getParticipantAndCheck(username, idTrip, action);
    ParticipantDTO participantDTO = new ParticipantDTO(participant);
    return ResponseEntity.ok(participantDTO);
  }

  @RequestMapping(method = DELETE, path = "/api/trips/{idTrip}/participants/{username}")
  public @ResponseBody
  ResponseEntity<HttpStatus>
  deleteParticipant(@PathVariable(name = "idTrip") long idTrip,
                    @PathVariable(name = "username") String username,
                    HttpSession session) {
    String action = "deleteParticipant";
    User user = getModeratorAndCheck(session, action);
    Trip trip = getTripAndCheck(idTrip, action);
    checkIfModeratorIsOwner(user, trip, action);
    Participant participant = getParticipantAndCheck(username, idTrip, action);
    this.participantService.deleteParticipant(participant.getUsername(), idTrip);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = PUT, path = "/api/trips/{idTrip}/participants/{username}")
  public @ResponseBody
  ResponseEntity<HttpStatus>
  updateParticipant(@PathVariable(name = "idTrip") long idTrip,
                    @PathVariable(name = "username") String username,
                    @Valid @RequestBody ParticipantDTO participantDTO,
                    HttpSession session) {
    String action = "updateParticipant";
    Trip trip = getTripAndCheck(idTrip, action);
    Participant participant = getParticipantAndCheck(username, idTrip, action);
    UserSession userSession = (UserSession) session.getAttribute("user");
    String usernameSession = userSession.getUsername();
    User user = this.userService.findByUsername(usernameSession).orElseThrow(
      () -> new TripException(action + ".error.userNotFound"));
    if (!user.getUsername().equals(trip.getModerator()) &&
      !participant.getUsername().equals(user.getUsername())) {
      throw new TripException(action + ".error.unauthorized");
    }
    this.participantService.updateParticipant(participant, participantDTO);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = GET, path = "/api/participants")
  public @ResponseBody
  Iterable<Participant>
  getAllParticipants() {
    return this.participantService.findAll();
  }


  //participant trips


  @RequestMapping(method = GET, path = "/api/user/trips")
  public @ResponseBody
  Iterable<Trip>
  getTripsByParticipant(@RequestParam(name = "idLevel", defaultValue = "%") String idLevel,
                        @RequestParam(name = "idStatus", defaultValue = "%") String idStatus,
                        HttpSession session) {
    UserSession userSession = (UserSession) session.getAttribute("user");
    String username = userSession.getUsername();
    Iterable<Participant> participants = this.participantService.findAllByUsername(username);
    return this.tripService.findAllByParamsAndParticipant(idLevel, idStatus, username);
  }

  @RequestMapping(method = GET, path = "/api/user/trips/archive")
  public @ResponseBody
  Iterable<Trip>
  getArchivedTripsByParticipant(HttpSession session) {
    UserSession userSession = (UserSession) session.getAttribute("user");
    String username = userSession.getUsername();
    Iterable<Participant> participants = this.participantService.findAllByUsername(username);
    List<Trip> trips = new ArrayList<>();
    for (Participant p : participants) {
      Trip trip = this.tripService.findByIdTrip(p.getIdTrip()).orElseThrow(
        () -> new TripException("getParticipantTrips.error.tripNotFound")
      );
      if (trip.getIdStatus() == 3) {
        trips.add(trip);
      }
    }
    return trips;
  }

  @RequestMapping(method = GET, path = "/api/user/trips/active")
  public @ResponseBody
  Iterable<Trip>
  getActiveTripsByParticipant(HttpSession session) {
    UserSession userSession = (UserSession) session.getAttribute("user");
    String username = userSession.getUsername();
    Iterable<Participant> participants = this.participantService.findAllByUsername(username);
    List<Trip> trips = new ArrayList<>();
    for (Participant p : participants) {
      Trip trip = this.tripService.findByIdTrip(p.getIdTrip()).orElseThrow(
        () -> new TripException("getParticipantTrips.error.tripNotFound")
      );
      if (trip.getIdStatus() == 2 || trip.getIdStatus() == 1) {
        trips.add(trip);
      }
    }
    return trips;
  }


  //comments


  @RequestMapping(method = POST, path = "/api/trips/{idTrip}/comments")
  public @ResponseBody
  ResponseEntity<Comment>
  addComment(@PathVariable(name = "idTrip") long idTrip,
             @Valid @RequestBody CommentDTO commentDTO,
             HttpSession session) {
    String action = "addComment";
    if (idTrip != commentDTO.getIdTrip()) {
      throw new TripException(action + ".error.wrongTrip");
    }
    Trip trip = getTripAndCheck(idTrip, action);
    UserSession userSession = (UserSession) session.getAttribute("user");
    String username = userSession.getUsername();
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new TripException(action + ".error.userNotFound"));
    Comment comment = this.commentService.createComment(commentDTO, username);
    return ResponseEntity.ok(comment);
  }

  @RequestMapping(method = PUT, path = "/api/trips/{idTrip}/comments/{idComment}")
  public @ResponseBody
  ResponseEntity<HttpStatus>
  updateComment(@PathVariable(name = "idTrip") long idTrip,
                @PathVariable(name = "idComment") long idComment,
                @Valid @RequestBody CommentDTO commentDTO,
                HttpSession session) {
    String action = "updateComment";
    Comment comment =
      this.commentService.findByIdCommentAndIdTrip(idComment, idTrip).orElseThrow(
        () -> new TripException(action + ".error.commentNotFound")
      );
    UserSession userSession = (UserSession) session.getAttribute("user");
    String username = userSession.getUsername();
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new TripException(action + ".error.userNotFound")
    );
    Trip trip = this.getTripAndCheck(idTrip, action);
    Participant participant = this.getParticipantAndCheck(username, idTrip, action);
    this.commentService.updateComment(comment, commentDTO);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = DELETE, path = "/api/trips/{idTrip}/comments/{idComment}")
  public @ResponseBody
  ResponseEntity<HttpStatus>
  deleteComment(@PathVariable(name = "idTrip") long idTrip,
                @PathVariable(name = "idComment") long idComment,
                HttpSession session) {
    String action = "deleteComment";
    Comment comment =
      this.commentService.findByIdCommentAndIdTrip(idComment, idTrip).orElseThrow(
        () -> new TripException(action + ".error.commentNotFound")
      );
    UserSession userSession = (UserSession) session.getAttribute("user");
    String username = userSession.getUsername();
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new TripException(action + ".error.userNotFound")
    );
    Trip trip = this.getTripAndCheck(idTrip, action);
    Participant participant = this.getParticipantAndCheck(username, idTrip, action);
    this.commentService.deleteComment(idComment);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = DELETE, path = "/api/trips/{idTrip}/comments")
  public @ResponseBody
  ResponseEntity<HttpStatus>
  deleteAllTripComments(@PathVariable(name = "idTrip") long idTrip,
                        HttpSession session) {
    String action = "deleteAllComments";
    Trip trip = this.getTripAndCheck(idTrip, action);
    User moderator = this.getModeratorAndCheck(session, action);
    this.checkIfModeratorIsOwner(moderator, trip, action);
    this.commentService.deleteAllByIdTrip(idTrip);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = GET, path = "/api/trips/{idTrip}/comments")
  public @ResponseBody
  Iterable<Comment>
  getCommentsByIdTrip(@PathVariable(name = "idTrip") long idTrip) {
    return this.commentService.findAllByIdTrip(idTrip);
  }


  //albums


  @RequestMapping(method = POST, path = "/api/trips/{idTrip}/albums")
  public @ResponseBody
  ResponseEntity<Album>
  addAlbum(@PathVariable(name = "idTrip") long idTrip,
           @Valid @RequestBody AlbumDTO albumDTO) {
    String action = "addAlbum";
    if (idTrip != albumDTO.getIdTrip()) {
      throw new TripException(action + ".error.wrongTrip");
    }
    Trip trip = getTripAndCheck(idTrip, action);
    Album album = this.albumService.createAlbum(albumDTO);
    return ResponseEntity.ok(album);
  }

  @RequestMapping(method = GET, path = "/api/trips/{idTrip}/albums")
  public @ResponseBody
  Iterable<Album>
  getAlbumsByIdTrip(@PathVariable(name = "idTrip") long idTrip) {
    return this.albumService.findAllByIdTrip(idTrip);
  }

  @RequestMapping(method = GET, path = "/api/trips/{idTrip}/albums/{idAlbum}")
  public @ResponseBody
  ResponseEntity<AlbumDTO>
  getAlbumByIdAlbum(@PathVariable(name = "idTrip") long idTrip,
                    @PathVariable(name = "idAlbum") long idAlbum) {
    Album album = this.albumService.findByIdAlbumAndIdTrip(idAlbum, idTrip).orElseThrow(
      () -> new TripException("error.getAlbum.albumNotFound")
    );
    AlbumDTO albumDTO = new AlbumDTO(album);
    return ResponseEntity.ok(albumDTO);
  }


  //photos


  @RequestMapping(method = POST, path = "/api/trips/{idTrip}/albums/{idAlbum}/photos")
  public @ResponseBody
  ResponseEntity<Photo>
  addPhoto(@PathVariable(name = "idTrip") long idTrip,
           @PathVariable(name = "idAlbum") long idAlbum,
           @RequestParam("file") MultipartFile file) {
    String action = "addPhoto";
    Trip trip = getTripAndCheck(idTrip, action);
    Album album = this.albumService.findByIdAlbum(idAlbum).orElseThrow(
      () -> new TripException(action + ".error.albumNotFound")
    );
    PhotoDTO photoDTO = new PhotoDTO(file, idAlbum);
    Photo photo = this.photoService.createPhoto(photoDTO);
    return ResponseEntity.ok(photo);
  }

  @RequestMapping(method = GET, path = "/api/trips/{idTrip}/albums/{idAlbum}/photos")
  public @ResponseBody
  Iterable<Photo>
  getPhotosByIdAlbum(@PathVariable(name = "idTrip") long idTrip,
                     @PathVariable(name = "idAlbum") long idAlbum) {
    Trip trip = this.getTripAndCheck(idTrip, "getPhotos");
    return this.photoService.findAllByIdAlbum(idAlbum);
  }


  //helpers


  private User getModeratorAndCheck(HttpSession session, String action) {
    UserSession userSession = (UserSession) session.getAttribute("user");
    String username = userSession.getUsername();
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new TripException(action + ".error.userNotFound"));
    if (!user.getRole().equals("MODER")) {
      throw new TripException(action + ".error.unauthorised");
    }
    return user;
  }

  private Iterable<Episode> getTripEpisodes(long idTrip, String action) {
    getTripAndCheck(idTrip, action);
    return this.episodeService.findAllByIdTrip(idTrip);
  }

  private Iterable<Participant> getTripParticipants(long idTrip, String action) {
    getTripAndCheck(idTrip, action);
    return this.participantService.findAllByIdTrip(idTrip);
  }

  private Trip getTripAndCheck(long idTrip, String action) {
    return this.tripService.findByIdTrip(idTrip).orElseThrow(
      () -> new TripException(action + ".error.tripNotFound"));
  }

  private Episode getEpisodeAndCheck(long idEpisode, long idTrip, String action) {
    return this.episodeService.findByIdEpisodeAndIdTrip(idEpisode, idTrip).orElseThrow(
      () -> new TripException(action + ".error.episodeNotFound"));
  }

  private Participant getParticipantAndCheck(String username, long idTrip, String action) {
    return this.participantService.findByUsernameAndIdTrip(username, idTrip).orElseThrow(
      () -> new TripException(action + ".error.participantNotFound"));
  }

  private Location getLocationAndCheck(Episode episode, String action) {
    return this.locationService.findByIdLocation(episode.getIdLocation()).orElseThrow(
      () -> new TripException(action + ".error.locationNotFound"));
  }

  private void checkIfModeratorIsOwner(User user, Trip trip, String action) {
    if (!trip.getModerator().equals(user.getUsername())) {
      throw new TripException(action + ".error.unauthorisedNotOwner");
    }
  }

}
