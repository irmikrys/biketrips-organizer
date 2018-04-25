package biketrips.repository;

import biketrips.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository("commentRepository")
public interface CommentRepository extends JpaRepository<Comment, Long> {

  Optional<Comment> findByIdComment(long idComment);

  Optional<Comment> findByIdCommentAndIdTrip(long idComment, long idTrip);

  Iterable<Comment> findAllByIdTrip(long idTrip);

  @Transactional
  void deleteByIdComment(long idComment);

  @Transactional
  void deleteAllByIdTrip(long idTrip);

}
