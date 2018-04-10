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

  @Autowired
  @Qualifier("statusRepository")
  private StatusRepository statusRepository;

  Iterable<Status> findAll() {
    return this.statusRepository.findAll();
  }

  Optional<Status> findByIdStatus(int idStatus) {
    return this.statusRepository.findByIdStatus(idStatus);
  }

  Optional<Status> findByName(String name) {
    return this.statusRepository.findByName(name);
  }

}
