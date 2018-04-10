package biketrips.repository;

import biketrips.model.Episode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository("episodeRepository")
public interface EpisodeRepository extends JpaRepository<Episode, Long> {
  
  Optional<Episode> findByIdEpisode(long idEpisode);
  
  Iterable<Episode> findAllByIdTrip(long idTrip);
  
  @Transactional
  void deleteByIdEpisode(long idEpisode);
}
