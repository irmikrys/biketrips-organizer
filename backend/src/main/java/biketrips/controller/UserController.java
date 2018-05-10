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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;

import static org.springframework.web.bind.annotation.RequestMethod.*;


@RestController
public class UserController {

  private final UserService userService;

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  public UserController(@Qualifier("userService") UserService userService,
                        BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userService = userService;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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
  ResponseEntity<HttpStatus> updateUser(
    @PathVariable("username") String username,
    @Valid @RequestBody UserDTO userDTO,
    HttpSession session) {
    UserSession userSession = (UserSession) session.getAttribute("user");
    User user = this.userService.findByUsername(userSession.getUsername()).orElseThrow(
      () -> new UserException("updateUser.error.userNotFound"));
    if (!user.getUsername().equals(userDTO.getUsername()) ||
      !username.equals(user.getUsername())) {
      throw new UserException("updateUser.error.unauthorised");
    }
    if (!user.getEmail().equals(userDTO.getEmail())) {
      this.userService.findByEmail(userDTO.getEmail()).ifPresent(
        userEmail -> {
          throw new UserException("updateUser.error.emailExists");
        });
    }
    if (!this.bCryptPasswordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
      throw new UserException("updateUser.error.incorrectPassword");
    }
    this.userService.updateUser(user, userDTO);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = PUT, path = "/api/users/{username}/role")
  public @ResponseBody
  ResponseEntity<HttpStatus> updateUserRole(
    @PathVariable("username") String username,
    @Valid @RequestBody UserDTO userDTO, HttpSession session) {
    UserSession userSession = (UserSession) session.getAttribute("user");
    String sessionUsername = userSession.getUsername();
    if (!sessionUsername.equals("admin")) {
      throw new UserException("updateUserRole.error.notAdmin");
    }
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new UserException("updateUser.error.userNotFound"));
    this.userService.updateRole(user, userDTO);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = PUT, path = "/api/users/{username}/points")
  public @ResponseBody
  ResponseEntity<HttpStatus> updateUserPoints(
    @PathVariable("username") String username,
    @RequestParam(name = "points") int points,
    HttpSession session) {
    UserSession userSession = (UserSession) session.getAttribute("user");
    String usernameSession = userSession.getUsername();
    User moderator = this.userService.findByUsername(usernameSession).orElseThrow(
      () -> new UserException("updateUserPoints.error.moderatorNotFound")
    );
    if (!moderator.getRole().equals("MODER")) {
      throw new UserException("updateUserPoints.error.userNotModerator");
    }
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new UserException("updateUserPoints.error.userNotFound")
    );
    UserDTO userDTO = new UserDTO(user);
    userDTO.setPoints(user.getPoints() + points);
    this.userService.updatePoints(user, userDTO);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = PUT, path = "/api/users/{username}/photo")
  public @ResponseBody
  ResponseEntity<HttpStatus> updateUserPhoto(
    @PathVariable("username") String username,
    @RequestParam("file") MultipartFile file)
    throws IOException {
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new UserException("updateUserPhoto.error.userNotFound"));
    if (!file.isEmpty()) {
      this.userService.updatePhoto(user, file.getBytes());
    }
    return ResponseEntity.ok(HttpStatus.OK);
  }

  private UserDetailsDTO getUserDetails(String username) {
    User user = this.userService.findByUsername(username).orElseThrow(
      () -> new UserException("details.error.userNotFound"));
    return new UserDetailsDTO(user);
  }
}
