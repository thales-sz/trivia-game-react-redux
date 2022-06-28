// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>Game</div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  globalState,
});

export default connect(mapStateToProps)(Game);
