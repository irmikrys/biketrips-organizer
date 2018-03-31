package biketrips.service;

import biketrips.dto.UserDTO;
import biketrips.model.User;

public interface UserService {

  User findByUsername(String username);

  User findByEmail(String username);

  Iterable<User> findAll();

  User createUser(UserDTO userDTO);

  User updateUser(UserDTO userDTO);


}
