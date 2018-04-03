package biketrips.repository;

import biketrips.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository("applicationsRepository")
public interface ApplicationsRepository extends JpaRepository<Application, Long> {

  Optional<Application> findByUsername(String username);

}
