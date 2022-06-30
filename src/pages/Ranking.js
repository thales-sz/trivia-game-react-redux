import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPlayerAction } from '../redux/actions';

class Ranking extends Component {
  state = {
    players: [],
  }

  componentDidMount = () => {
    const unorderedPlayers = JSON.parse(localStorage.getItem('ranking'));
    const orderedPlayers = unorderedPlayers.sort((a, b) => b.score - a.score);
    this.setState({ players: orderedPlayers });
  }

  handleButtonPlayAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(resetPlayerAction());
    history.push('/');
  }

  render() {
    const { players } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ol>
          {
            players.map((e, i) => (
              <li key={ e.index }>
                <p data-testid={ `player-name-${i}` }>{e.name}</p>
                <p data-testid={ `player-score-${i}` }>{e.score}</p>
                <img src={ e.picture } alt={ e.name } />
              </li>
            ))
          }
        </ol>
        <button
          type="button"
          data-testid="btn-go-home"
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

Ranking.propTypes = {
  globalState: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Ranking);
