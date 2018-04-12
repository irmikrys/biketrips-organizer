package biketrips.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(ParticipantsPK.class)
@Table(name = "participants")
public class Participant implements Serializable {

  @Id
  @Column(name = "username")
  private String username;

  @Id
  @Column(name = "idTrip")
  private long idTrip;

  @Column(name = "idActivity")
  private int idActivity;

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

  public void setIdActivity(int idActivity) {
    this.idActivity = idActivity;
  }
}

@Embeddable
class ParticipantsPK implements Serializable {

  private String username;
  private long idTrip;

}
