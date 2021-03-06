package biketrips.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "photos")
public class Photo implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idPhoto", nullable = false)
  private long idPhoto;

  @Column(name = "idAlbum", nullable = false)
  private long idAlbum;

  @Column(name = "photo", nullable = false)
  private byte[] photo;

  public long getIdPhoto() {
    return idPhoto;
  }

  public void setIdPhoto(long idPhoto) {
    this.idPhoto = idPhoto;
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
