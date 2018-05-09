package biketrips.dto;

import biketrips.model.Photo;

public class PhotoDTO {

  private long idAlbum;

  private String photo;

  public PhotoDTO() {

  }

  public PhotoDTO(Photo photo) {
    setIdAlbum(photo.getIdAlbum());
    setPhoto(photo.getPhoto());
  }

  public Photo toPhoto() {
    Photo photo = new Photo();
    photo.setIdAlbum(getIdAlbum());
    photo.setPhoto(getPhoto());
    return photo;
  }

  public long getIdAlbum() {
    return idAlbum;
  }

  public void setIdAlbum(long idAlbum) {
    this.idAlbum = idAlbum;
  }

  public String getPhoto() {
    return photo;
  }

  public void setPhoto(String photo) {
    this.photo = photo;
  }
}
