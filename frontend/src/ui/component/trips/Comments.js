import React, {Component} from 'react';
import {datetimeFormatter} from "../utils";

class Comments extends Component {

  constructor(props) {
    super(props);
    const {participants} = this.props;
    this.state = {
      isUserParticipant: participants.filter(
        item => item.username === props.username
      ).length === 1
    };
  }

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
                      <div>{datetimeFormatter(new Date(comment.createDate))}</div>
                      <div><b>{comment.owner}</b>: {comment.content}</div>
                    </div>
                  );
                })
            }
          </div>
        </div>
        }
      </div>
    );
  }

}

export default Comments;
