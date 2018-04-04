package biketrips.controller;

import biketrips.dto.UserDTO;
import biketrips.dto.UserDetailsDTO;
import biketrips.exceptions.RegisterException;
import biketrips.exceptions.UserException;
import biketrips.model.User;
import biketrips.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;


@RestController
public class UserController {

  @Autowired
  private UserService userService;

  @RequestMapping(method = POST, path = "/api/register")
  public @ResponseBody
  ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO)
    throws RegisterException {
    this.userService.findByUsername(userDTO.getUsername()).ifPresent(
      user -> {
        throw new RegisterException("register.error.usernameExists");
      });
    this.userService.findByEmail((userDTO.getEmail())).ifPresent(
      user -> {
        throw new RegisterException("register.error.emailExists");
      });
    User user = userService.createUser(userDTO);
    return ResponseEntity.ok(user);
  }

  @RequestMapping(method = GET, path = "/api/users")
  public @ResponseBody
  Iterable<User> getAllUsers() {
    return userService.findAll();
  }

  @RequestMapping(method = GET, path = "/api/users/{username}")
  public @ResponseBody
  ResponseEntity<UserDetailsDTO> getUser(@PathVariable("username") String username) {
    UserDetailsDTO userDetails = this.getUserDetails(username);
    return ResponseEntity.ok(userDetails);
  }

  private UserDetailsDTO getUserDetails(String username) {
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new UserException("details.error.userNotFound"));
    return new UserDetailsDTO(user);
  }
}
