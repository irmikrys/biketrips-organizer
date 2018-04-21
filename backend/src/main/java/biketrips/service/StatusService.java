package biketrips.service;

import biketrips.model.Status;
import biketrips.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Qualifier("statusService")
public class StatusService {

  private final StatusRepository statusRepository;

  @Autowired
  public StatusService(@Qualifier("statusRepository") StatusRepository statusRepository) {
    this.statusRepository = statusRepository;
  }

  public Iterable<Status> findAll() {
    return this.statusRepository.findAll();
  }

  public Optional<Status> findByIdStatus(int idStatus) {
    return this.statusRepository.findByIdStatus(idStatus);
  }

  public Optional<Status> findByName(String name) {
    return this.statusRepository.findByName(name);
  }

}
