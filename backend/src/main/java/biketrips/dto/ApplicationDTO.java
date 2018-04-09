package biketrips.dto;

import biketrips.model.Application;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;

public class ApplicationDTO {

  @Pattern(regexp = "^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+$")
  @Size(min = 3, max = 30)
  private String username;

  @Email
  private String email;

  private boolean isActive;

  private Date createDate;

  public ApplicationDTO () {

  }

  public ApplicationDTO (Application application) {
    this.setUsername(application.getUsername());
    this.setEmail(application.getEmail());
    this.setActive(application.isActive());
  }

  public Application toApplication(boolean isActive) {
    Application application = new Application();
    application.setUsername(getUsername());
    application.setEmail(getEmail());
    application.setActive(isActive);
    return application;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public boolean isActive() {
    return isActive;
  }

  public void setActive(boolean active) {
    isActive = active;
  }

  public Date getCreateDate() {
    return createDate;
  }

  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
  }
}
