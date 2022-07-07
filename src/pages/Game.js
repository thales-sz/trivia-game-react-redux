import React, { Component } from 'react';
import GameHeader from '../components/GameHeader';
import Quiz from '../components/Quiz';

class Game extends Component {
  render() {
    return (
      <div className="Game">
        <GameHeader />
        <Quiz />
      </div>
    );
  }
}

export default Game;
