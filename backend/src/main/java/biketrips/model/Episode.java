package biketrips.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "episodes")
public class Episode implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idEpisode")
  private long idEpisode;

  @Column(name = "idTrip")
  private long idTrip;

  @Column(name = "time")
  private Date time;

  @Column(name = "description")
  private String description;

  @Column(name = "idLocation")
  private long idLocation;

  public long getIdEpisode() {
    return idEpisode;
  }

  public void setIdEpisode(long idEpisode) {
    this.idEpisode = idEpisode;
  }

  public long getIdTrip() {
    return idTrip;
  }

  public void setIdTrip(long idTrip) {
    this.idTrip = idTrip;
  }

  public Date getTime() {
    return time;
  }

  public void setTime(Date time) {
    this.time = time;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public long getIdLocation() {
    return idLocation;
  }

  public void setIdLocation(long idLocation) {
    this.idLocation = idLocation;
  }
}
