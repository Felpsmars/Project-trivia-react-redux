import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">ranking page</h1>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-go-home"
        >
          Voltar ao início
        </button>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Ranking);
