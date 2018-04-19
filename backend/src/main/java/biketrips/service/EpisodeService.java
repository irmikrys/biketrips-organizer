package biketrips.service;

import biketrips.dto.EpisodeDTO;
import biketrips.model.Episode;
import biketrips.model.Location;
import biketrips.repository.EpisodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("episodeService")
public class EpisodeService {

  @Autowired
  @Qualifier("episodeRepository")
  private EpisodeRepository episodeRepository;

  @Autowired
  @Qualifier("locationService")
  private LocationService locationService;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public Optional<Episode> findByIdEpisode(long idEpisode) {
    return this.episodeRepository.findByIdEpisode(idEpisode);
  }

  public Optional<Episode> findByIdEpisodeAndIdTrip(long idEpisode, long idTrip) {
    return this.episodeRepository.findByIdEpisodeAndIdTrip(idEpisode, idTrip);
  }

  public Iterable<Episode> findAllByIdTrip(long idTrip) {
    return this.episodeRepository.findAllByIdTrip(idTrip);
  }

  public Episode createEpisode(EpisodeDTO episodeDTO) {
    Location location = this.locationService.createLocation(episodeDTO.getLocationDTO());
    Episode episode = episodeDTO.toEpisode(location.getIdLocation());
    return this.episodeRepository.save(episode);
  }

  public void deleteEpisode(long idEpisode, long idLocation) {
    this.episodeRepository.deleteByIdEpisode(idEpisode);
    this.locationService.deleteLocation(idLocation);
  }

  public void updateEpisode(Episode oldEpisode, Location oldLocation, EpisodeDTO newEpisode) {
    final String sql = "" +
      "UPDATE episodes e " +
      "SET e.time = ?, e.description = ? " +
      "WHERE e.idEpisode = ?";
    this.jdbcTemplate.update(sql, newEpisode.getTime(), newEpisode.getDescription(), oldEpisode.getIdEpisode());
    this.locationService.updateLocation(oldLocation, newEpisode.getLocationDTO());
  }

  public Iterable<Episode> findAll() {
    return this.episodeRepository.findAll();
  }
}
