package biketrips.service;

import biketrips.dto.UserDTO;
import biketrips.model.User;
import biketrips.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("userService")
public class UserService {

  @Autowired
  @Qualifier("userRepository")
  private UserRepository userRepository;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  public Optional<User> findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public Optional<User>  findByEmail(String username) {
    return userRepository.findByEmail(username);
  }

  public Iterable<User> findAll() {
    return userRepository.findAll();
  }

  public User createUser(UserDTO userDTO) {
    User user = userDTO.toUser(bCryptPasswordEncoder.encode(userDTO.getPassword()));
    return userRepository.save(user);
  }

  public void updateUser(User oldUser, UserDTO newUser) {
    final String sql = "UPDATE users u SET u.role = ? WHERE u.username = ?";
    this.jdbcTemplate.update(sql, newUser.getRole(), oldUser.getUsername());
  }
}