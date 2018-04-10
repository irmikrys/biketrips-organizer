package biketrips.repository;

import biketrips.model.Status;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Qualifier("statusRepository")
public interface StatusRepository extends JpaRepository<Status, Long>{

  Optional<Status> findByIdStatus(int idStatus);

  Optional<Status> findByName(String name);

}
