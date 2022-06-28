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

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
