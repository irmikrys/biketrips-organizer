package biketrips.repository;

import biketrips.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository("participantRepository")
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

  Iterable<Participant> findAllByIdActivity(int idActivity);

  Iterable<Participant> findAllByIdTrip(long idTrip);

  Iterable<Participant> findAllByUsername(String username);

  Optional<Participant> findByUsernameAndIdTrip(String username, long idTrip);

  @Transactional
  void deleteByUsernameAndIdTrip(String username, long idTrip);

}
