package biketrips.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "activities")
public class Activity implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idActivity")
  private int idActivity;

  @Column(name = "name")
  private String name;

  public int getIdActivity() {
    return idActivity;
  }

  public void setIdActivity(int idActivity) {
    this.idActivity = idActivity;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
