package biketrips.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "levels")
public class Level implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idLevel")
  private int idLevel;

  @Column(name = "name")
  private String name;

  public int getIdLevel() {
    return idLevel;
  }

  public void setIdLevel(int idLevel) {
    this.idLevel = idLevel;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
