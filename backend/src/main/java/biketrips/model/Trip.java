package biketrips.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "trips")
public class Trip implements Serializable {

  @Id
  @Column(name = "idTrip")
  private int idTrip;

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


  public int getIdTrip() {
    return idTrip;
  }

  public void setIdTrip(int idTrip) {
    this.idTrip = idTrip;
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
