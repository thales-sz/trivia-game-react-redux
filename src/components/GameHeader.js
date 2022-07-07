import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileImageURLAction } from '../redux/actions';
import './GameHeader.css';

class GameHeader extends Component {
  componentDidMount = () => {
    const { dispatch, email } = this.props;
    dispatch(getProfileImageURLAction(email));
  }

  render() {
    const { score, name, profileImage } = this.props;

    return (
      <header className="GameHeader">
        <div className="score-container">
          <h2 id="title-score">
            Sua pontuação:
          </h2>
          <h2 data-testid="header-score" id="score">
            {score}
          </h2>
        </div>
        <div className="user-container">
          <img
            className="userImg"
            src={ profileImage }
            alt="Imagem de perfil"
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name" id="username">{name}</h2>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  profileImage: state.player.profileImage,
  score: state.player.score,
});

GameHeader.propTypes = {
  dispatch: PropTypes.func,
  email: PropTypes.string,
  name: PropTypes.string,
  profileImage: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(GameHeader);
