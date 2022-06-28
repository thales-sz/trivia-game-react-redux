// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    this.setState({ [name]: value });
    this.verifyButton();
  }

  render() {
    const { inputName, inputEmail, isButtonDisabled } = this.state;
    return (
      <section>
        <input
          type="text"
          data-testid="input-player-name"
          placeholder="Nome"
          name="inputName"
          value={ inputName }
          onChange={ this.handleChange }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          placeholder="Email"
          name="inputEmail"
          value={ inputEmail }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isButtonDisabled }
        >
          PLAY
        </button>
      </section>
    );
  }
}

const mapStateToProps = (globalState) => ({
  globalState,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
