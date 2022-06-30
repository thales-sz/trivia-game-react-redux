import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';

class Feedback extends Component {
  handleButtonCLick = () => {
    const { history } = this.props;
    history.push('/');
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
          data-testid="btn-play-again"
          onClick={ this.handleButtonCLick }
        >
          PLAY AGAIN
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
