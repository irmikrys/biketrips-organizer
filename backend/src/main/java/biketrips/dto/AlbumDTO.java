package biketrips.dto;

import biketrips.model.Album;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.DecimalMin;

public class AlbumDTO {

  @DecimalMin(value = "0", inclusive = false)
  private long idTrip;

  @NotBlank
  private String name;

  public AlbumDTO() {

  }

  public AlbumDTO(Album album) {
    setIdTrip(album.getIdTrip());
    setName(album.getName());
  }

  public Album toAlbum() {
    Album album = new Album();
    album.setIdTrip(getIdTrip());
    album.setName(getName());
    return album;
  }

  public long getIdTrip() {
    return idTrip;
  }

  public void setIdTrip(long idTrip) {
    this.idTrip = idTrip;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
