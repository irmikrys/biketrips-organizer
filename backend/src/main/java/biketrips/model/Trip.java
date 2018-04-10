package biketrips.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "trips")
public class Trip implements Serializable {

  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  @Column(name = "idTrip")
  private long idTrip;

  @Column(name = "moderator")
  private String moderator;

  @Column(name = "name")
  private String name;

  @Column(name = "startDate")
  private Date startDate;

  @Column(name = "endDate")
  private Date endDate;

  @Column(name = "idLevel")
  private int idLevel;

  @Column(name = "idStatus")
  private int idStatus;

  @Column(name = "description")
  private String description;

  @Column(name = "points")
  private int points;

  public long getIdTrip() {
    return idTrip;
  }

  public void setIdTrip(long idTrip) {
    this.idTrip = idTrip;
  }

  public String getModerator() {
    return moderator;
  }

  public void setModerator(String moderator) {
    this.moderator = moderator;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }

  public int getIdLevel() {
    return idLevel;
  }

  public void setIdLevel(int idLevel) {
    this.idLevel = idLevel;
  }

  public int getIdStatus() {
    return idStatus;
  }

  public void setIdStatus(int idStatus) {
    this.idStatus = idStatus;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public int getPoints() {
    return points;
  }

  public void setPoints(int points) {
    this.points = points;
  }

}
