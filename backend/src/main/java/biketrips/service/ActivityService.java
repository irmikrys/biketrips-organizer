package biketrips.service;

import biketrips.model.Activity;
import biketrips.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("activityService")
public class ActivityService {

  private final ActivityRepository activityRepository;

  @Autowired
  public ActivityService(@Qualifier("activityRepository") ActivityRepository activityRepository) {
    this.activityRepository = activityRepository;
  }

  public Iterable<Activity> findAll() {
    return this.activityRepository.findAll();
  }

  public Optional<Activity> findByIdActivity(int idActivity) {
    return this.activityRepository.findByIdActivity(idActivity);
  }

  public Optional<Activity> findByName(String name) {
    return this.activityRepository.findByName(name);
  }

}
