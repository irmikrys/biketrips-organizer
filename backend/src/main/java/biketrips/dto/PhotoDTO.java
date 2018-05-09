package biketrips.dto;

import biketrips.model.Photo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class PhotoDTO {

  private long idAlbum;

  private byte[] photo;

  public PhotoDTO() {

  }

  public PhotoDTO(Photo photo) {
    setIdAlbum(photo.getIdAlbum());
    setPhoto(photo.getPhoto());
  }

  public PhotoDTO(MultipartFile photoFile, long idAlbum) {
    setIdAlbum(idAlbum);
    try {
      setPhoto(photoFile.getBytes());
    } catch (IOException e) {
      e.printStackTrace();
    }
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

  public byte[] getPhoto() {
    return photo;
  }

  public void setPhoto(byte[] photo) {
    this.photo = photo;
  }
}
