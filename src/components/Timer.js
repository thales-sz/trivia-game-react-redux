import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Timer extends Component {
  state = {
    timer: 30,
  }

  componentDidMount = () => {
    const second = 1000;
    this.myInterval = setInterval(this.timerFunc, second);
  }

  componentWillUnmount = () => {
    clearInterval(this.myInterval);
  }

  timerFunc = () => {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }), () => {
      const { timer } = this.state;
      const { getTimer } = this.props;
      getTimer(timer);
      if (timer === 0) {
        const { handleTimer } = this.props;
        clearInterval(this.myInterval);
        handleTimer();
      }
    });
  }

  render() {
    const { timer } = this.state;
    const { answeredQuestion } = this.props;
    if (answeredQuestion) {
      clearInterval(this.myInterval);
    }
    return (
      <div className="timer">
        Tempo restante:
        {' '}
        {timer}
      </div>
    );
  }
}

Timer.propTypes = {
  answeredQuestion: PropTypes.bool.isRequired,
  handleTimer: PropTypes.func.isRequired,
  getTimer: PropTypes.func.isRequired,
};

export default Timer;
