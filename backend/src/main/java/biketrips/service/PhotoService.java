package biketrips.service;

import biketrips.dto.PhotoDTO;
import biketrips.model.Photo;
import biketrips.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("photoService")
public class PhotoService {

  private final PhotoRepository photoRepository;

  @Autowired
  public PhotoService(@Qualifier("photoRepository") PhotoRepository photoRepository) {
    this.photoRepository = photoRepository;
  }

  public Optional<Photo> findByIdPhoto(long idPhoto) {
    return this.photoRepository.findByIdPhoto(idPhoto);
  }

  public Iterable<Photo> findAllByIdAlbum(long idAlbum) {
    return this.photoRepository.findAllByIdAlbum(idAlbum);
  }

  public Photo createPhoto(PhotoDTO photoDTO) {
    Photo photo = photoDTO.toPhoto();
    return photoRepository.save(photo);
  }

  public void deleteAllByIdAlbum(long idAlbum) {
    this.photoRepository.deleteAllByIdAlbum(idAlbum);
  }

  public void deleteByIdPhoto(long idPhoto) {
    this.photoRepository.deletePhotoByIdPhoto(idPhoto);
  }


}
