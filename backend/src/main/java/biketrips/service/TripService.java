package biketrips.service;

import biketrips.dto.TripDTO;
import biketrips.model.Trip;
import biketrips.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("tripService")
public class TripService {

  private final TripRepository tripRepository;

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public TripService(@Qualifier("tripRepository") TripRepository tripRepository,
                     JdbcTemplate jdbcTemplate) {
    this.tripRepository = tripRepository;
    this.jdbcTemplate = jdbcTemplate;
  }

  public Iterable<Trip> findAll() {
    return this.tripRepository.findAll();
  }

  public Optional<Trip> findByIdTrip(long idTrip) {
    return this.tripRepository.findByIdTrip(idTrip);
  }

  public Iterable<Trip> findAllByIdStatusAndModerator(int idStatus, String moderator) {
    return this.tripRepository.findAllByIdStatusAndModerator(idStatus, moderator);
  }

  public Iterable<Trip> findAllByParams(String idLevel, String idStatus, String moderator) {
    return this.tripRepository.findAllByParams(idLevel, idStatus, moderator);
  }

  public Iterable<Trip> findAllByParticipant(String participant) {
    return this.tripRepository.findAllByParticipant(participant);
  }

  public Iterable<Trip> findAllByParticipantAndIdStatus(String participant, long idStatus) {
    return this.tripRepository.findAllByParticipantAndIdStatus(participant, idStatus);
  }

  public Iterable<Trip> findAllByParticipantAndParams(String idLevel, String idStatus, String participant) {
    return this.tripRepository.findAllByParticipantAndParams(idLevel, idStatus, participant);
  }

  public Trip createTrip(TripDTO tripDTO) {
    Trip trip = tripDTO.toTrip();
    return this.tripRepository.save(trip);
  }

  public void updateTrip(Trip oldTrip, TripDTO newTripDTO) {
    final String sql = "" +
      "UPDATE trips t " +
      "SET t.name = ?, t.description = ?, t.idLevel = ?, t.points = ?, t.idStatus = ? " +
      "WHERE t.idTrip = ?";
    this.jdbcTemplate.update(
      sql, newTripDTO.getName(), newTripDTO.getDescription(),
      newTripDTO.getIdLevel(), newTripDTO.getPoints(), newTripDTO.getIdStatus(),
      oldTrip.getIdTrip()
    );
  }
}
