import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const PLAYER_ASSERTIONS = 3;

class Feedbacks extends React.Component {
  constructor(props) {
    super(props);
    this.messagePlayerScore = this.messagePlayerScore.bind(this);
    this.handlePlayAgainClick = this.handlePlayAgainClick.bind(this);
    this.handleRankingClick = this.handleRankingClick.bind(this);
  }

  messagePlayerScore() {
    const { player: { assertions } } = this.props;
    const message = assertions < PLAYER_ASSERTIONS
      ? 'Podia ser melhor...' : 'Mandou bem!';
    return message;
  }

  handlePlayAgainClick() {
    const { history } = this.props;
    history.push('/');
  }

  handleRankingClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { player } = this.props;
    return (
      <div>
        <Header />
        <h1>{`Olá ${player.name}!`}</h1>
        <h2 data-testid="feedback-total-question">
          {player.assertions}
        </h2>
        <h3 data-testid="feedback-total-score">
          {player.score}
        </h3>
        <p data-testid="feedback-text">{this.messagePlayerScore()}</p>
        <button
          type="button"
          onClick={ this.handlePlayAgainClick }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
        <button
          type="button"
          onClick={ this.handleRankingClick }
          data-testid="btn-ranking"
        >
          Ver ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ game: { player } }) => ({
  player,
});

Feedbacks.propTypes = {
  player: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
