package biketrips.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "comments")
public class Comment implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idComment")
  private long idComment;

  @Column(name = "owner")
  private String owner;

  @Column(name = "idTrip")
  private long idTrip;

  @Column(name = "content")
  private String content;

  @CreationTimestamp
  @Column(name = "createDate")
  private Date createDate;


  public long getIdComment() {
    return idComment;
  }

  public void setIdComment(long idComment) {
    this.idComment = idComment;
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

  public Date getCreateDate() {
    return createDate;
  }

  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
  }
}
