package biketrips.repository;

import biketrips.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository("tripRepository")
public interface TripRepository extends JpaRepository<Trip, Long> {

  Optional<Trip> findByIdTrip(long idTrip);

  Iterable<Trip> findAllByModerator(String moderator);

  Iterable<Trip> findAllByIdLevel(int idLevel);

  Iterable<Trip> findAllByIdStatus(int idStatus);

  @Transactional
  void deleteByIdTrip(long idTrip);

}
