package biketrips.controller;

import biketrips.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TripController {

  @Autowired
  @Qualifier("tripService")
  private TripService tripService;

}
