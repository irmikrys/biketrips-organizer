package biketrips.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import biketrips.model.Location;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository("locationRepository")
public interface LocationRepository extends JpaRepository<Location, Long> {

  Optional<Location> findByIdLocation(long idLocation);

  @Transactional
  void deleteByIdLocation(long idLocation);

}
