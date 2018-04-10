package biketrips.repository;

import biketrips.model.Level;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Qualifier("levelRepository")
public interface LevelRepository extends JpaRepository<Level, Long> {

  Optional<Level> findByIdLevel(int idLevel);

  Optional<Level> findByName(String name);
}
