package biketrips.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import biketrips.dto.LocationDTO;
import biketrips.model.Location;
import biketrips.repository.LocationRepository;

import java.util.Optional;

@Service("locationService")
public class LocationService {

  private final LocationRepository locationRepository;

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public LocationService(@Qualifier("locationRepository") LocationRepository locationRepository,
                         JdbcTemplate jdbcTemplate) {
    this.locationRepository = locationRepository;
    this.jdbcTemplate = jdbcTemplate;
  }


  public Optional<Location> findByIdLocation(long idLocation) {
    return this.locationRepository.findByIdLocation(idLocation);
  }

  public Location createLocation(LocationDTO locationDTO) {
    Location location = locationDTO.toLocation();
    return this.locationRepository.save(location);
  }

  public void deleteLocation(long idLocation) {
    this.locationRepository.deleteByIdLocation(idLocation);
  }

  public void updateLocation(Location oldLocation, LocationDTO newLocation) {
    if (!oldLocation.getDescription().equals(newLocation.getDescription())) {
      final String sql = "UPDATE locations l SET l.description = ?, l.latitude = ?, l.longitude = ? WHERE l.idLocation = ?";
      this.jdbcTemplate.update(sql, newLocation.getDescription(), newLocation.getLatitude(), newLocation.getLongitude(), oldLocation.getIdLocation());
    }
  }
}

