package biketrips.dto;

import biketrips.model.Application;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class ApplicationDTO {

  @Pattern(regexp = "^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+$")
  @Size(min = 3, max = 30)
  private String username;

  @Email
  private String email;

  public Application toApplication() {
    Application application = new Application();
    application.setUsername(getUsername());
    application.setEmail(getEmail());
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
}
