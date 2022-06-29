import React, { Component } from 'react';
import GameHeader from '../components/GameHeader';

class Feedback extends Component {
  render() {
    return (
      <div>
        <GameHeader />
        <div data-testid="feedback-text">Feedback</div>
      </div>
    );
  }
}

export default Feedback;
