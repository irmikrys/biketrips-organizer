package biketrips.controller;

import biketrips.dto.EpisodeDTO;
import biketrips.dto.TripDTO;
import biketrips.dto.session.UserSession;
import biketrips.exceptions.TripException;
import biketrips.exceptions.UserException;
import biketrips.model.*;
import biketrips.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class TripController {

  @Autowired
  @Qualifier("tripService")
  private TripService tripService;

  @Autowired
  @Qualifier("userService")
  private UserService userService;

  @Autowired
  @Qualifier("statusService")
  private StatusService statusService;

  @Autowired
  @Qualifier("levelService")
  private LevelService levelService;

  @Autowired
  @Qualifier("episodeService")
  private EpisodeService episodeService;

  @Autowired
  @Qualifier("locationService")
  private LocationService locationService;


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

  @RequestMapping(method = GET, path = "/api/trips/moderator/{moderator}")
  public @ResponseBody
  Iterable<Trip>
  getTripsByModerator(@PathVariable(name = "moderator") String username, HttpSession session) {
    User user = getModeratorAndCheck(session, "getTripsByModerator");
    if (!user.getUsername().equals(username)) {
      throw new TripException("getTripsByModerator.error.unauthorisedNotOwner");
    }
    return this.tripService.findAllByModerator(username);
  }

  @RequestMapping(method = POST, path = "/api/trips/{idTrip}/episodes")
  public @ResponseBody
  ResponseEntity<Episode>
  createEpisode(@PathVariable(name = "idTrip") long idTrip,
                @Valid @RequestBody EpisodeDTO episodeDTO,
                HttpSession session) {
    String action = "createEpisode";
    if(idTrip != episodeDTO.getIdTrip()) {
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
  Iterable<Episode>
  getEpisodesByIdTrip(@PathVariable(name = "idTrip") long idTrip) {
    return getTripEpisodes(idTrip, "getTripEpisodes");
  }

  @RequestMapping(method = PUT, path = "/api/trips/{idTrip}/episodes/{idEpisode}")
  public @ResponseBody ResponseEntity<HttpStatus>
  updateEpisode(@PathVariable(name = "idTrip") long idTrip,
                @PathVariable(name = "idEpisode") long idEpisode,
                @Valid @RequestBody EpisodeDTO episodeDTO,
                HttpSession session) {
    String action = "updateEpisode";
    User user = getModeratorAndCheck(session, action);
    Trip trip = getTripAndCheck(idTrip, action);
    checkIfModeratorIsOwner(user, trip, action);
    Episode episode = this.episodeService.findByIdEpisode(idEpisode).orElseThrow(
      () -> new TripException(action + ".error.episodeNotFound"));
    Location location = this.locationService.findByIdLocation(episode.getIdLocation()).orElseThrow(
      () -> new TripException(action + ".error.locationNotFound"));
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
    Episode episode = this.episodeService.findByIdEpisodeAndIdTrip(idEpisode, idTrip).orElseThrow(
      () -> new TripException(action + ".error.episodeNotFound"));
    this.episodeService.deleteEpisode(episode.getIdEpisode(), episode.getIdLocation());
    return ResponseEntity.ok(HttpStatus.OK);
  }


  private User getModeratorAndCheck(HttpSession session, String action) {
    UserSession userSession = (UserSession) session.getAttribute("user");
    String username = userSession.getUsername();
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new UserException(action + ".error.userNotFound"));
    if (!user.getRole().equals("MODER")) {
      throw new TripException(action + ".error.unauthorised");
    }
    return user;
  }

  private Iterable<Episode> getTripEpisodes(long idTrip, String action) {
    getTripAndCheck(idTrip, action);
    return this.episodeService.findAllByIdTrip(idTrip);
  }

  private Trip getTripAndCheck(long idTrip, String action) {
    return this.tripService.findByIdTrip(idTrip).orElseThrow(
      () -> new TripException(action + ".error.tripNotFound"));
  }

  private void checkIfModeratorIsOwner(User user, Trip trip, String action) {
    if(!trip.getModerator().equals(user.getUsername())) {
      throw new TripException(action + ".error.unauthorisedNotOwner");
    }
  }

}
