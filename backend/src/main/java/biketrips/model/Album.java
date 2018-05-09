package biketrips.model;

import javax.persistence.*;

@Entity
@Table(name = "albums")
public class Album {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idAlbum", nullable = false)
  private long idAlbum;

  @Column(name = "idTrip", nullable = false)
  private long idTrip;

  @Column(name = "name", nullable = false)
  private String name;

  public long getIdAlbum() {
    return idAlbum;
  }

  public void setIdAlbum(long idAlbum) {
    this.idAlbum = idAlbum;
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
