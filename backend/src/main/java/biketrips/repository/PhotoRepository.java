package biketrips.repository;

import biketrips.model.Photo;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Qualifier("photoRepository")
public interface PhotoRepository extends JpaRepository<Photo, Long> {

  Optional<Photo> findByIdPhoto(long idPhoto);

  Iterable<Photo> findAllByIdAlbum(long idAlbum);

  @Transactional
  void deletePhotoByIdPhoto(long idPhoto);

  @Transactional
  void deleteAllByIdAlbum(long idAlbum);

}
