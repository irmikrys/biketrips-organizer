package biketrips.dto;

import biketrips.model.Comment;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.DecimalMin;

public class CommentDTO {

  @DecimalMin(value = "0", inclusive = false)
  private long idTrip;

  @NotBlank
  private String content;

  public CommentDTO() {

  }

  public CommentDTO(Comment comment) {
    this.setContent(comment.getContent());
    this.setIdTrip(comment.getIdTrip());
  }

  public Comment toComment(String owner) {
    Comment comment = new Comment();
    comment.setOwner(owner);
    comment.setContent(getContent());
    comment.setIdTrip(getIdTrip());
    return comment;
  }

  public long getIdTrip() {
    return idTrip;
  }

  public void setIdTrip(long idTrip) {
    this.idTrip = idTrip;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
