package biketrips.service;

import biketrips.model.Trip;
import biketrips.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("tripService")
public class TripService {

  @Autowired
  @Qualifier("tripRepository")
  private TripRepository tripRepository;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public Optional<Trip> findByIdTrip(long idTrip) {
    return this.tripRepository.findByIdTrip(idTrip);
  }

  public Iterable<Trip> findAllByIdLevel(int idLevel) {
    return this.tripRepository.findAllByIdLevel(idLevel);
  }

  public Iterable<Trip> findAllByIdStatus(int idStatus) {
    return this.tripRepository.findAllByIdStatus(idStatus);
  }
}
