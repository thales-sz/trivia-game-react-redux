// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
  render() {
    return (
      <div data-testid="settings-title">
        Settings
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  globalState,
});

export default connect(mapStateToProps)(Settings);
