package biketrips.dto;

import biketrips.model.User;

public class UserDetailsDTO {

  private User user;

  public UserDetailsDTO(User user) {
    this.user = user;
  }

  public User getUser() {
    return user;
  }
}
