package biketrips.service;

import biketrips.dto.ApplicationDTO;
import biketrips.model.Application;
import biketrips.repository.ApplicationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("applicationsService")
public class ApplicationsService {

  @Autowired
  @Qualifier("applicationsRepository")
  private ApplicationsRepository applicationsRepository;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public Optional<Application> findByUsername(String username) {
    return applicationsRepository.findByUsername(username);
  }

  public Optional<Application> findByEmail(String email) {
    return applicationsRepository.findByEmail(email);
  }

  public Iterable<Application> findAll() {
    return applicationsRepository.findAll();
  }

  public Application createApplication(ApplicationDTO applicationDTO) {
    Application application = applicationDTO.toApplication(true);
    return applicationsRepository.save(application);
  }

  public void updateApplication(Application oldApplication, ApplicationDTO newApplication) {
    final String sql = "UPDATE applications a SET a.isActive = ? WHERE a.username = ?";
    this.jdbcTemplate.update(sql, newApplication.isActive(), oldApplication.getUsername());
  }

  public void deleteApplication(String username) {
    this.applicationsRepository.deleteByUsername(username);
  }

  public Iterable<ApplicationDTO> findAllActive() {
    final String sql = "SELECT * FROM applications a WHERE a.isActive = '1'";
    return this.jdbcTemplate.query(sql, (rs, rowNum) -> {
      ApplicationDTO applicationDTO = new ApplicationDTO();
      applicationDTO.setUsername(rs.getString("username"));
      applicationDTO.setEmail(rs.getString("email"));
      applicationDTO.setActive(rs.getBoolean("isActive"));
      return applicationDTO;
    });
  }
}

