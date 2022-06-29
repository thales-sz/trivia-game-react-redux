import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileImageURLAction } from '../redux/actions';

class GameHeader extends Component {
  componentDidMount = () => {
    const { dispatch, email } = this.props;
    dispatch(getProfileImageURLAction(email));
  }

  render() {
    const { score, name, profileImage } = this.props;

    return (
      <header>
        <img
          src={ profileImage }
          alt="Imagem de perfil"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{name}</h2>
        <p data-testid="header-score">{score}</p>
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
