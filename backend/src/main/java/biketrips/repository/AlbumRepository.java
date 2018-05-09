package biketrips.repository;

import biketrips.model.Album;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Qualifier("albumRepository")
public interface AlbumRepository extends JpaRepository<Album, Long> {

  Optional<Album> findByIdAlbum(long idAlbum);

  Optional<Album> findByName(String name);

  Iterable<Album> findAllByIdTrip(long idTrip);

  @Transactional
  void deleteAlbumByIdAlbum(long idAlbum);

  @Transactional
  void deleteAllByIdTrip(long idTrip);

}
