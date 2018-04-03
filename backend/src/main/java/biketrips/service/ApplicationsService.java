package biketrips.service;

import biketrips.dto.ApplicationDTO;
import biketrips.model.Application;
import biketrips.repository.ApplicationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("applicationsService")
public class ApplicationsService {

  @Autowired
  @Qualifier("applicationsRepository")
  private ApplicationsRepository applicationsRepository;

  public Optional<Application> findByUsername(String username) {
    return applicationsRepository.findByUsername(username);
  }

  public Iterable<Application> findAll() {
    return applicationsRepository.findAll();
  }

  public Application createApplication(ApplicationDTO applicationDTO) {
    Application application = applicationDTO.toApplication();
    return applicationsRepository.save(application);
  }

}

