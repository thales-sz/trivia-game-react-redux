import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';

class Feedback extends Component {
  handleButtonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleButtonRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { globalState: { player } } = this.props;
    return (
      <div>
        <GameHeader />
        { player.assertions > 2 ? (
          <>
            <h2 data-testid="feedback-text">Well Done!</h2>
            <h3>Pontos Totais:</h3>
            <div data-testid="feedback-total-score">{ player.score }</div>
            <h3>Número de acertos:</h3>
            <div data-testid="feedback-total-question">{ player.assertions }</div>
          </>
        ) : (
          <>
            <h2 data-testid="feedback-text">Could be better...</h2>
            <h3>Pontos Totais:</h3>
            <div data-testid="feedback-total-score">{ player.score }</div>
            <h3>Número de acertos:</h3>
            <div data-testid="feedback-total-question">{ player.assertions }</div>
          </>
        )}
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleButtonRanking }
        >
          VER RANKING
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleButtonPlayAgain }
        >
          JOGAR NOVAMENTE
        </button>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  globalState,
});

Feedback.propTypes = {
  globalState: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
