// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <h2 data-testid="ranking-title">Ranking</h2>
    );
  }
}

const mapStateToProps = (globalState) => ({
  globalState,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
