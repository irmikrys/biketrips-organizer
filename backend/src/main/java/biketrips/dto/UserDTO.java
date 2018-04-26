package biketrips.dto;

import biketrips.model.User;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserDTO {

  @Pattern(regexp = "^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+$")
  @Size(min = 3, max = 30)
  private String username;

  @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{6,30}")
  private String password;

  @Pattern(regexp = "^([a-zA-Z]+\\s?)*[a-zA-Z]+$")
  @Size(min = 3, max = 30)
  private String firstName;

  @Pattern(regexp = "^([a-zA-Z]+\\s?)*[a-zA-Z]+$")
  @Size(min = 3, max = 30)
  private String lastName;

  @Email
  private String email;

  @NotBlank
  private String role;

  @DecimalMin(value = "0")
  private int points;

  public UserDTO() {

  }

  public UserDTO(User user) {
    setFirstName(user.getFirstName());
    setLastName(user.getLastName());
    setEmail(user.getEmail());
    setRole(user.getRole());
    setUsername(user.getUsername());
    setPassword(user.getPassword());
    setPoints(user.getPoints());
  }

  public User toUser(String password) {
    User user = new User();
    user.setUsername(getUsername());
    user.setFirstName(getFirstName());
    user.setLastName(getLastName());
    user.setEmail(getEmail());
    user.setPassword(password);
    user.setRole(getRole());
    user.setPoints(getPoints());
    return user;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public int getPoints() {
    return points;
  }

  public void setPoints(int points) {
    this.points = points;
  }
}
