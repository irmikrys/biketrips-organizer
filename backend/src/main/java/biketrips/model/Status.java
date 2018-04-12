package biketrips.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "statuses")
public class Status implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idStatus")
  private int idStatus;

  @Column(name = "name")
  private String name;

  public int getIdStatus() {
    return idStatus;
  }

  public void setIdStatus(int idStatus) {
    this.idStatus = idStatus;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
