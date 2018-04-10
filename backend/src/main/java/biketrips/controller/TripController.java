package biketrips.controller;

import biketrips.dto.TripDTO;
import biketrips.dto.session.UserSession;
import biketrips.exceptions.TripException;
import biketrips.exceptions.UserException;
import biketrips.model.Level;
import biketrips.model.Status;
import biketrips.model.Trip;
import biketrips.model.User;
import biketrips.service.LevelService;
import biketrips.service.StatusService;
import biketrips.service.TripService;
import biketrips.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

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

    UserSession userSession = (UserSession) session.getAttribute("user");
    String username = userSession.getUsername();
    User userCreator = this.userService.findByUsername(username).orElseThrow(
      () -> new UserException("createTrip.error.userNotFound"));
    if (!userCreator.getRole().equals("MODER")) {
      throw new TripException("createTrip.error.unauthorised");
    }
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
    Trip trip = this.tripService.findByIdTrip(idTrip).orElseThrow(
      () -> new TripException("getTrip.error.tripNotFound"));

    TripDTO tripDTO = new TripDTO(trip);
    return ResponseEntity.ok(tripDTO);
  }

}
