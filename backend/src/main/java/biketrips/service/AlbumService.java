package biketrips.service;

import biketrips.dto.AlbumDTO;
import biketrips.model.Album;
import biketrips.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("albumService")
public class AlbumService {

  private final AlbumRepository albumRepository;

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public AlbumService(@Qualifier("albumRepository") AlbumRepository albumRepository,
                        JdbcTemplate jdbcTemplate) {
    this.albumRepository = albumRepository;
    this.jdbcTemplate = jdbcTemplate;
  }

  public Optional<Album> findByIdAlbum(long idAlbum) {
    return this.albumRepository.findByIdAlbum(idAlbum);
  }

  public Optional<Album> findByIdAlbumAndIdTrip(long idAlbum, long idTrip) {
    return this.albumRepository.findAlbumByIdAlbumAndIdTrip(idAlbum, idTrip);
  }

  public Iterable<Album> findAllByIdTrip(long idTrip) {
    return this.albumRepository.findAllByIdTrip(idTrip);
  }

  public Album createAlbum(AlbumDTO albumDTO) {
    Album album = albumDTO.toAlbum();
    return albumRepository.save(album);
  }

  public void updateAlbum(Album oldAlbum, AlbumDTO newAlbum) {
    final String sql = "UPDATE albums a SET a.name = ? WHERE a.idAlbum = ?";
    this.jdbcTemplate.update(sql, newAlbum.getName(), oldAlbum.getIdAlbum());
  }

  public void deleteAlbum(long idAlbum) {
    this.albumRepository.deleteAlbumByIdAlbum(idAlbum);
  }

  public void deleteAllByIdTrip(long idTrip) {
    this.albumRepository.deleteAllByIdTrip(idTrip);
  }


}
