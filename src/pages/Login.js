import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAction, requestUserToken } from '../redux/actions';
import './Login.css';

class Login extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    isButtonDisabled: true,
  }

  verifyButton = () => {
    const { inputName, inputEmail } = this.state;
    if (inputName.length > 0 && inputEmail.length > 0) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.verifyButton);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const userToken = await requestUserToken();
    dispatch(userAction(this.state));
    localStorage.setItem('token', userToken.token);
    history.push('/game');
  }

  handleButtonClick = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { inputName, inputEmail, isButtonDisabled } = this.state;
    return (
      <section>
        <form onSubmit={ this.handleSubmit } className="login-form">
          <img src="https://diariodeumquimicodigital.files.wordpress.com/2017/07/show_do_milhc3a3o_logo.gif" alt="logo" width="200px" />
          <input
            type="text"
            className="form-name"
            data-testid="input-player-name"
            placeholder="Nome"
            name="inputName"
            value={ inputName }
            onChange={ this.handleChange }
          />
          <input
            type="email"
            className="form-email"
            data-testid="input-gravatar-email"
            placeholder="Email"
            name="inputEmail"
            value={ inputEmail }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            className="form-btn-play"
            name="play"
            data-testid="btn-play"
            disabled={ isButtonDisabled }
          >
            PLAY
          </button>
          <button
            type="button"
            className="form-btn-config"
            name="settings"
            data-testid="btn-settings"
            onClick={ this.handleButtonClick }
          >
            CONFIGURAÇÕES
          </button>
          <img src="https://static.sbt.com.br/media/playlist/20100419153609/20150209162622/tn/20190405173603.jpg" alt="silvio" width="250px" />
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Login);
