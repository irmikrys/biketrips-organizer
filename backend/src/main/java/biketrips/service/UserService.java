package biketrips.service;

import biketrips.dto.UserDTO;
import biketrips.model.User;
import biketrips.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service("userService")
public class UserService {

  private final UserRepository userRepository;

  private final JdbcTemplate jdbcTemplate;

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  public UserService(@Qualifier("userRepository") UserRepository userRepository,
                     JdbcTemplate jdbcTemplate,
                     BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userRepository = userRepository;
    this.jdbcTemplate = jdbcTemplate;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  public Optional<User> findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public Optional<User> findByEmail(String username) {
    return userRepository.findByEmail(username);
  }

  public Iterable<User> findAll() {
    return userRepository.findAll();
  }

  public User createUser(UserDTO userDTO) {
    User user = userDTO.toUser(bCryptPasswordEncoder.encode(userDTO.getPassword()));
    return userRepository.save(user);
  }

  public void updateUser(User oldUser, UserDTO userDTO) {
    if (!((oldUser.getEmail().equals(userDTO.getEmail())) &&
      (oldUser.getFirstName().equals(userDTO.getFirstName())) &&
      (oldUser.getLastName().equals(userDTO.getLastName()))
    )) {
      final String sql = "" +
        "UPDATE users u " +
        "SET u.email = ?, u.firstName = ?, u.lastName = ? " +
        "WHERE u.username = ?";
      this.jdbcTemplate.update(sql, userDTO.getEmail(), userDTO.getFirstName(),
        userDTO.getLastName(), oldUser.getUsername());
    }
  }

  public void updateRole(User oldUser, UserDTO userDTO) {
    final String sql = "" +
      "UPDATE users u " +
      "SET u.role = ? " +
      "WHERE u.username = ?";
    this.jdbcTemplate.update(sql, userDTO.getRole(), oldUser.getUsername());
  }

  public void updatePoints(User oldUser, UserDTO userDTO) {
    final String sql = "" +
      "UPDATE users u " +
      "SET u.points = ? " +
      "WHERE u.username = ?";
    this.jdbcTemplate.update(sql, userDTO.getPoints(), oldUser.getUsername());
  }

  public void updatePhoto(User user, byte[] photo) {
    if (!Arrays.equals(user.getPhoto(), photo)) {
      final String sql = "" +
        "UPDATE users u " +
        "SET u.photo = ? " +
        "WHERE u.username = ?";
      this.jdbcTemplate.update(sql, photo, user.getUsername());
    }
  }
}
