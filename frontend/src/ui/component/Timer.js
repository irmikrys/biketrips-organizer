import React, {Component} from 'react';
import {timeFormatter} from "./utils";

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: Date.now()
    };
  }

  componentDidMount() {
    setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    return (
      <div className='centered'>{timeFormatter(new Date(this.state.time))}</div>
    );
  }

}

export default Timer;
