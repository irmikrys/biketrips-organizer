package biketrips.dto;

import biketrips.model.Episode;
import biketrips.model.Location;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.Valid;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class EpisodeDTO {

  @DecimalMin(value = "0", inclusive = false)
  private long idTrip;

  @NotNull
  private Date time;

  @NotBlank
  private String description;

  @Valid
  private LocationDTO locationDTO;

  public EpisodeDTO() {

  }

  public EpisodeDTO(Episode episode, Location location) {
    setIdTrip(episode.getIdTrip());
    setTime(episode.getTime());
    setDescription(episode.getDescription());
    setLocationDTO(new LocationDTO(location));
  }

  public Episode toEpisode(long idLocation) {
    Episode episode = new Episode();
    episode.setIdTrip(getIdTrip());
    episode.setTime(getTime());
    episode.setDescription(getDescription());
    episode.setIdLocation(idLocation);
    return episode;
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

  public LocationDTO getLocationDTO() {
    return locationDTO;
  }

  public void setLocationDTO(LocationDTO locationDTO) {
    this.locationDTO = locationDTO;
  }
}
