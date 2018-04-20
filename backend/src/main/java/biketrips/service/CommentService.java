package biketrips.service;

import biketrips.dto.CommentDTO;
import biketrips.model.Comment;
import biketrips.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("commentService")
public class CommentService {

  @Autowired
  @Qualifier("commentRepository")
  private CommentRepository commentRepository;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public Optional<Comment> findByIdComment(long idComment) {
    return this.commentRepository.findByIdComment(idComment);
  }

  public Optional<Comment> findByIdCommentAndIdTrip(long idComment, long idTrip) {
    return this.commentRepository.findByIdCommentAndIdTrip(idComment, idTrip);
  }

  public Iterable<Comment> findAllByIdTrip(long idTrip) {
    return this.commentRepository.findAllByIdTrip(idTrip);
  }

  public Comment createComment(CommentDTO commentDTO, String owner) {
    Comment comment = commentDTO.toComment(owner);
    return commentRepository.save(comment);
  }

  public void updateComment(Comment oldComment, CommentDTO newComment) {
    final String sql = "UPDATE comments c SET c.content = ? WHERE c.idComment = ?";
    this.jdbcTemplate.update(sql, newComment.getContent(), oldComment.getIdComment());
  }

  public void deleteComment(long idComment) {
    this.commentRepository.deleteByIdComment(idComment);
  }

  public void deleteAllByIdTrip(long idTrip) {
    this.commentRepository.deleteAllByIdTrip(idTrip);
  }
}
