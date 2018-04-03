package biketrips.controller;

import biketrips.dto.UserDTO;
import biketrips.dto.session.UserSession;
import biketrips.exceptions.AccessingPrivateResourcesException;
import biketrips.exceptions.RegisterException;
import biketrips.model.User;
import biketrips.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.*;


@RestController
public class UserController {

  @Autowired
  private UserService userService;

  @RequestMapping(method = POST, path = "/api/register")
  public @ResponseBody
  ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) throws RegisterException {
    if (userService.findByUsername(userDTO.getUsername()) != null) {
      throw new RegisterException("register.error.usernameExists");
    }
    if (userService.findByEmail(userDTO.getEmail()) != null) {
      throw new RegisterException("register.error.emailExists");
    }
    User user = userService.createUser(userDTO);
    return ResponseEntity.ok(user);
  }

  @RequestMapping(method = PUT, path = "/api/users")
  public @ResponseBody
  ResponseEntity<User> updateUser(@Valid @RequestBody UserDTO userDTO, HttpSession session) throws AccessingPrivateResourcesException {
    UserSession userSession = (UserSession) session.getAttribute("user");
    if (!userSession.getUsername().equals(userDTO.getUsername()))
      throw new AccessingPrivateResourcesException("updateUser.error.accessDenied");
    User updatedUser = userService.updateUser(userDTO);
    return ResponseEntity.ok(updatedUser);
  }

  @RequestMapping(method = GET, path = "/api/users")
  public @ResponseBody
  Iterable<User> getAllUsers() {
    return userService.findAll();
  }

  @RequestMapping(method = GET, path = "/api/users/{username}")
  public @ResponseBody
  ResponseEntity<User> getUser(@PathVariable("username") String username) {
    User user = userService.findByUsername(username);
    return ResponseEntity.ok(user);
  }
}
