package biketrips.service;

import biketrips.model.Level;
import biketrips.repository.LevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("levelService")
public class LevelService {

  private final LevelRepository levelRepository;

  @Autowired
  public LevelService(@Qualifier("levelRepository") LevelRepository levelRepository) {
    this.levelRepository = levelRepository;
  }

  public Iterable<Level> findAll() {
    return this.levelRepository.findAll();
  }

  public Optional<Level> findByIdLevel(int idLevel) {
    return this.levelRepository.findByIdLevel(idLevel);
  }

  public Optional<Level> findByName(String name) {
    return this.levelRepository.findByName(name);
  }

}
