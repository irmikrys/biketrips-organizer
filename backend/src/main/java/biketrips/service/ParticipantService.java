package biketrips.service;

import biketrips.dto.ParticipantDTO;
import biketrips.model.Participant;
import biketrips.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("participantService")
public class ParticipantService {

  private final ParticipantRepository participantRepository;

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public ParticipantService(@Qualifier("participantRepository") ParticipantRepository participantRepository,
                            JdbcTemplate jdbcTemplate) {
    this.participantRepository = participantRepository;
    this.jdbcTemplate = jdbcTemplate;
  }

  public Iterable<Participant> findAll() {
    return this.participantRepository.findAll();
  }

  public Iterable<Participant> findAllByUsername(String username) {
    return this.participantRepository.findAllByUsername(username);
  }

  public Iterable<Participant> findAllByIdActivity(int idActivity) {
    return this.participantRepository.findAllByIdActivity(idActivity);
  }

  public Iterable<Participant> findAllByIdTrip(long idTrip) {
    return this.participantRepository.findAllByIdTrip(idTrip);
  }

  public Optional<Participant> findByUsernameAndIdTrip(String username, long idTrip) {
    return this.participantRepository.findByUsernameAndIdTrip(username, idTrip);
  }

  public Participant createParticipant(ParticipantDTO participantDTO) {
    Participant participant = participantDTO.toParticipant();
    return this.participantRepository.save(participant);
  }

  public void deleteParticipant(String username, long idTrip) {
    this.participantRepository.deleteByUsernameAndIdTrip(username, idTrip);
  }

  public void updateParticipant(Participant oldParticipant, ParticipantDTO newParticipant) {
    final String sql = "" +
      "UPDATE participants p " +
      "SET p.idActivity = ? " +
      "WHERE p.username = ? AND p.idTrip = ?";
    this.jdbcTemplate.update(sql, newParticipant.getIdActivity(), oldParticipant.getUsername(), oldParticipant.getIdTrip());
  }
}
