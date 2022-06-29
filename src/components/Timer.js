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
      if (timer === 0) {
        const { handleTimer } = this.props;
        clearInterval(this.myInterval);
        handleTimer();
      }
    });
  }

  clearTimer = () => {
    // função que envia o valor do timer para o pai
    clearInterval(this.myInterval);
  }

  render() {
    const { timer } = this.state;
    const { answeredQuestion } = this.props;
    if (answeredQuestion) this.clearTimer();
    return (
      <div>{timer}</div>
    );
  }
}

Timer.propTypes = {
  answeredQuestion: PropTypes.bool.isRequired,
  handleTimer: PropTypes.func.isRequired,
};

export default Timer;
