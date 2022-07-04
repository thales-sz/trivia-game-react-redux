import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';
import { resetPlayerAction } from '../redux/actions';

class Feedback extends Component {
  componentDidMount = () => {
    const { globalState: { player } } = this.props;
    // adicionar em um array com o objeto do novo jogador
    const oldRanking = JSON.parse(localStorage.getItem('ranking'));
    const newPlayer = {
      name: player.name,
      score: player.score,
      picture: player.profileImage,
    };
    if (oldRanking) {
      const newRanking = [...oldRanking, newPlayer];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newPlayer]));
    }
  }

  handleButtonPlayAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(resetPlayerAction());
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
