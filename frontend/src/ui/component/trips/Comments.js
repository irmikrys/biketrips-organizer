import React, {Component} from 'react';
import {datetimeFormatter} from "../utils";

class Comments extends Component {

  constructor(props) {
    super(props);
    const {participants} = this.props;
    this.state = {
      isUserParticipant: participants.filter(
        item => item.username === props.username
      ).length === 1,
      commentInput: "",
    };
  }

  handleInputChange = event => {
    event.preventDefault();
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  handleSubmit = event => {
    event.preventDefault();
    const {post} = this.props;
    const {fetchComments} = this.props;
    const {idTrip} = this.props;
    const content = this.state.commentInput;
    const commentInfo = {
      idTrip,
      content
    };
    post(idTrip, commentInfo);
    fetchComments(idTrip);
  };

  handleDelete = idComment => {
    const {idTrip} = this.props;
    const {fetchComments, deleteComment} = this.props;
    deleteComment(idTrip, idComment);
    console.log('deletion...');
    fetchComments(idTrip);
  };

  render() {
    return (
      <div>
        {!this.state.isUserParticipant && null}
        {this.state.isUserParticipant &&
        <div className='comments-container'>
          <div className='comments-view'>
            <h4>Comments</h4>
            {
              Object.values(this.props.comments)
                .map((comment, key) => {
                  return (
                    <div key={key}
                         className="comment"
                    >
                      {
                        this.props.username === comment.owner &&
                        <div>
                          <span className='glyphicon glyphicon-trash trash'
                                onClick={() => this.handleDelete(comment.idComment)}
                          />
                        </div>
                      }
                      <div>{datetimeFormatter(new Date(comment.createDate))}</div>
                      <div><b>{comment.owner}</b>: {comment.content}</div>
                    </div>
                  );
                })
            }
            <form className='form-comment'
                  onSubmit={this.handleSubmit}>
              <textarea cols="100"
                        rows="5"
                        placeholder="write a comment..."
                        name="commentInput"
                        onInput={this.handleInputChange}
                        required
              />
              <button type="submit">Add comment</button>
            </form>
          </div>
        </div>
        }
      </div>
    );
  }

}

export default Comments;
