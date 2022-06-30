import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameHeader from '../components/GameHeader';

class Feedback extends Component {
  render() {
    const { globalState: { player } } = this.props;
    return (
      <div>
        <GameHeader />
        { player.assertions > 2 ? (
          <h2 data-testid="feedback-text">Well Done!</h2>
        ) : (
          <h2 data-testid="feedback-text">Could be better...</h2>
        )}
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
