package biketrips.dto;

import biketrips.model.Trip;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import java.util.Date;

public class TripDTO {

  @NotBlank
  private String name;

  @NotBlank
  private String moderator;

  private Date startDate;

  private Date endDate;

  @DecimalMin(value = "0", inclusive = false)
  @DecimalMax(value = "10")
  private int idLevel;

  @DecimalMin(value = "0", inclusive = false)
  @DecimalMax(value = "10")
  private int idStatus;

  @NotBlank
  private String description;

  @DecimalMin(value = "0", inclusive = false)
  @DecimalMax(value = "1000")
  private int points;

  public TripDTO() {

  }

  public TripDTO(Trip trip) {
    this.moderator = trip.getModerator();
    this.name = trip.getName();
    this.startDate = trip.getStartDate();
    this.endDate = trip.getEndDate();
    this.idLevel = trip.getIdLevel();
    this.idStatus = trip.getIdStatus();
    this.description = trip.getDescription();
    this.points = trip.getPoints();
  }

  public Trip toTrip() {
    Trip trip = new Trip();
    trip.setModerator(getModerator());
    trip.setName(getName());
    trip.setStartDate(getStartDate());
    trip.setEndDate(getEndDate());
    trip.setIdLevel(getIdLevel());
    trip.setIdStatus(getIdStatus());
    trip.setDescription(getDescription());
    trip.setPoints(getPoints());
    return trip;
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

}
