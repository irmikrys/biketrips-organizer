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
          <div className='comments-view'>
            Comments
            {
              Object.values(this.props.comments)
                .map((comment, key) => {
                  return (
                    <div key={key}
                         className="comment"
                    >
                      {datetimeFormatter(new Date(comment.createDate))}, {comment.owner}: {comment.content}
                    </div>
                  );
                })
            }
          </div>
        }
      </div>
    );
  }

}

export default Comments;
