package biketrips.dto;

import biketrips.model.Comment;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.DecimalMin;

public class CommentDTO {

  @NotBlank
  private String owner;

  @DecimalMin(value = "0", inclusive = false)
  private long idTrip;

  @NotBlank
  private String content;

  public CommentDTO() {

  }

  public CommentDTO(Comment comment) {
    this.setOwner(comment.getOwner());
    this.setContent(comment.getContent());
    this.setIdTrip(comment.getIdTrip());
  }

  public Comment toComment() {
    Comment comment = new Comment();
    comment.setOwner(getOwner());
    comment.setContent(getContent());
    comment.setIdTrip(getIdTrip());
    return comment;
  }

  public String getOwner() {
    return owner;
  }

  public void setOwner(String owner) {
    this.owner = owner;
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
