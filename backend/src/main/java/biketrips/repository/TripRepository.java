package biketrips.repository;

import biketrips.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository("tripRepository")
public interface TripRepository extends JpaRepository<Trip, Long> {

  Optional<Trip> findByIdTrip(long idTrip);

  Iterable<Trip> findAllByModerator(String moderator);

  Iterable<Trip> findAllByIdLevel(int idLevel);

  Iterable<Trip> findAllByIdStatus(int idStatus);

  @QueryHints(forCounting = false)
  @Query(
    value = "" +
      "SELECT * FROM trips " +
      "WHERE (idLevel LIKE ?1) AND (idStatus LIKE ?2) AND (moderator LIKE ?3);",
    nativeQuery = true
  )
  Iterable<Trip> findAllByParams(String idLevel, String idStatus, String moderator);

  @QueryHints(forCounting = false)
  @Query(
    value = "" +
      "SELECT * FROM trips t NATURAL JOIN participants p " +
      "WHERE (t.idLevel LIKE ?1) AND (t.idStatus LIKE ?2) AND (p.username LIKE ?3);",
    nativeQuery = true
  )
  Iterable<Trip> findAllByParamsAndParticipant(String idLevel, String idStatus, String participant);

  @Transactional
  void deleteByIdTrip(long idTrip);

}
