import React from 'react';
import { connect } from 'react-redux';

class Feedbacks extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedbacks</h1>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Feedbacks);
