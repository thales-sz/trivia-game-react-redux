import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAction } from '../redux/actions';

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

  handleSubmit = (e) => {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(userAction(this.state));
    history.push('/game');
  }

  render() {
    console.log(this.props);
    const { inputName, inputEmail, isButtonDisabled } = this.state;
    return (
      <section>
        <form onSubmit={ this.handleSubmit }>
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
            type="submit"
            data-testid="btn-play"
            disabled={ isButtonDisabled }
          >
            PLAY
          </button>
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
