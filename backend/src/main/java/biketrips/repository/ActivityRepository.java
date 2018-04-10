package biketrips.repository;

import biketrips.model.Activity;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Qualifier("activityRepository")
public interface ActivityRepository extends JpaRepository<Activity, Long> {

  Optional<Activity> findByIdActivity(int idActivity);

  Optional<Activity> findByName(String name);

}
