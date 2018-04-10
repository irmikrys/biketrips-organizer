package biketrips.dto;

import org.hibernate.validator.constraints.NotBlank;
import biketrips.model.Location;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Size;

public class LocationDTO {

  @NotBlank
  @Size(min=3, max=60)
  private String description;

  @DecimalMin(value = "-90.0")
  @DecimalMax(value = "90.0")
  private double latitude;

  @DecimalMin(value = "-180.0")
  @DecimalMax(value = "180.0")
  private double longitude;

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public double getLatitude() {
    return latitude;
  }

  public void setLatitude(double latitude) {
    this.latitude = latitude;
  }

  public double getLongitude() {
    return longitude;
  }

  public void setLongitude(double longitude) {
    this.longitude = longitude;
  }

  public Location toLocation() {
    Location location = new Location();
    location.setDescription(getDescription());
    location.setLatitude(getLatitude());
    location.setLongitude(getLongitude());
    return location;
  }

}

