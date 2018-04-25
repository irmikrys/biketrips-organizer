package biketrips.dto;

import biketrips.model.Participant;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class ParticipantDTO {

  @Pattern(regexp = "^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+$")
  @Size(min = 3, max = 30)
  private String username;

  @DecimalMin("1")
  private long idTrip;

  @DecimalMin("1")
  @DecimalMax("4")
  private int idActivity;

  public ParticipantDTO() {

  }

  public ParticipantDTO(Participant participant) {
    setUsername(participant.getUsername());
    setIdTrip(participant.getIdTrip());
    setIdActivity(participant.getIdActivity());
  }

  public Participant toParticipant() {
    Participant participant = new Participant();
    participant.setUsername(getUsername());
    participant.setIdTrip(getIdTrip());
    participant.setIdActivity(getIdActivity());
    return participant;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public long getIdTrip() {
    return idTrip;
  }

  public void setIdTrip(long idTrip) {
    this.idTrip = idTrip;
  }

  public int getIdActivity() {
    return idActivity;
  }

  public void setIdActivity(int activity) {
    this.idActivity = activity;
  }
}
