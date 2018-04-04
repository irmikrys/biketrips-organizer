package biketrips.repository;

import biketrips.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository("applicationsRepository")
public interface ApplicationsRepository extends JpaRepository<Application, Long> {

  Optional<Application> findByUsername(String username);

  Optional<Application> findByEmail(String email);

  @Transactional
  void deleteByUsername(String username);

}
