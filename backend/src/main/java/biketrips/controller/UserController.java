package biketrips.controller;

import biketrips.dto.UserDTO;
import biketrips.dto.UserDetailsDTO;
import biketrips.dto.session.UserSession;
import biketrips.exceptions.RegisterException;
import biketrips.exceptions.UserException;
import biketrips.model.User;
import biketrips.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.*;


@RestController
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(@Qualifier("userService") UserService userService) {
    this.userService = userService;
  }

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

  @RequestMapping(method = GET, path = "/api/user/details")
  public @ResponseBody
  ResponseEntity<UserDTO>
  getUserFromSession(HttpSession session) {
    UserSession userSession = (UserSession) session.getAttribute("user");
    String username = userSession.getUsername();
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new UserException("getDetails.error.userNotFound")
    );
    return ResponseEntity.ok(new UserDTO(user));
  }

  @RequestMapping(method = PUT, path = "/api/users/{username}")
  public @ResponseBody
  ResponseEntity<HttpStatus> updateUserRole(
    @PathVariable("username") String username,
    @Valid @RequestBody UserDTO userDTO
  ) {
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new UserException("getUser.error.userNotFound"));
    this.userService.updateUserRole(user, userDTO);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  private UserDetailsDTO getUserDetails(String username) {
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new UserException("details.error.userNotFound"));
    return new UserDetailsDTO(user);
  }
}
