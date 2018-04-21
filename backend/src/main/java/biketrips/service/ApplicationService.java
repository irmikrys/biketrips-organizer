package biketrips.service;

import biketrips.dto.ApplicationDTO;
import biketrips.model.Application;
import biketrips.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("applicationsService")
public class ApplicationService {

  private final ApplicationRepository applicationRepository;

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public ApplicationService(@Qualifier("applicationsRepository") ApplicationRepository applicationRepository,
                            JdbcTemplate jdbcTemplate) {
    this.applicationRepository = applicationRepository;
    this.jdbcTemplate = jdbcTemplate;
  }

  public Optional<Application> findByUsername(String username) {
    return applicationRepository.findByUsername(username);
  }

  public Optional<Application> findByEmail(String email) {
    return applicationRepository.findByEmail(email);
  }

  public Iterable<Application> findAll() {
    return applicationRepository.findAll();
  }

  public Application createApplication(ApplicationDTO applicationDTO) {
    Application application = applicationDTO.toApplication(true);
    return applicationRepository.save(application);
  }

  public void updateApplication(Application oldApplication, ApplicationDTO newApplication) {
    final String sql = "UPDATE applications a SET a.isActive = ? WHERE a.username = ?";
    this.jdbcTemplate.update(sql, newApplication.isActive(), oldApplication.getUsername());
  }

  public void deleteApplication(String username) {
    this.applicationRepository.deleteByUsername(username);
  }

  public Iterable<ApplicationDTO> findAllActive() {
    final String sql = "SELECT * FROM applications a WHERE a.isActive = '1'";
    return this.jdbcTemplate.query(sql, (rs, rowNum) -> {
      ApplicationDTO applicationDTO = new ApplicationDTO();
      applicationDTO.setUsername(rs.getString("username"));
      applicationDTO.setEmail(rs.getString("email"));
      applicationDTO.setActive(rs.getBoolean("isActive"));
      applicationDTO.setCreateDate(rs.getDate("createDate"));
      return applicationDTO;
    });
  }
}

