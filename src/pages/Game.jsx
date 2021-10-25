import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardGame from '../components/CardGame';
import Header from '../components/Header';
// import getQuestions from '../services/fetchQuestionsAPI';
import { addCount, fetchQuestions, refreshTimer as refreshTimerAction,
  resetTimer as resetTimerAction,
  showNext } from '../redux/actions';
import Timer from '../components/Timer';

// const ONE_SECOND = 1000;
const RESET_COUNTDOWN = 30;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.retriveQuestions = this.retriveQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { player: statePlayer, game } = this.props;
    this.retriveQuestions();
    const player = JSON.stringify({ player: statePlayer });
    localStorage.setItem('state', JSON.stringify(game));
  }

  async retriveQuestions() {
    const { retrieveQuestions } = this.props;
    const token = localStorage.getItem('token');
    retrieveQuestions(token);
  }

  handleClick() {
    const { history, count, increaseCount,
      refreshTimer, resetTimer, toogleNextButton, player: statePlayer, game } = this.props;
    const player = JSON.stringify({ player: statePlayer });
    resetTimer(false);
    toogleNextButton(false);
    const FOUR = 4;
    const buttons = document.querySelectorAll('button');
    refreshTimer(RESET_COUNTDOWN);
    buttons.forEach((button) => { button.className = ''; });
    localStorage.setItem('state', game);
    if (count < FOUR) {
      increaseCount(count + 1);
    } else {
      history.push('/result');
    }
  }

  render() {
    const { count, questions, countdown, toogleNextButton, showNextBtn } = this.props;
    if (countdown === 0 || showNextBtn === true) {
      clearInterval(this.timer);
      toogleNextButton(true);
    }

    return (
      <div>
        <Header />
        <Timer />
        TRIVIA
        { questions.length === 0
          ? <span>Loading ...</span>
          : <CardGame question={ questions[count] } next={ this.handleClick } />}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  count: game.count,
  questions: game.questions,
  timer: game.timer,
  countdown: game.countdown,
  showNextBtn: game.next,
  player: game.player,
  game,
});

const mapDispatchToProps = (dispatch) => ({
  increaseCount: (counter) => dispatch(addCount(counter)),
  retrieveQuestions: (token) => dispatch(fetchQuestions(token)),
  refreshTimer: (time) => dispatch(refreshTimerAction(time)),
  resetTimer: (timer) => dispatch(resetTimerAction(timer)),
  toogleNextButton: (boolean) => dispatch(showNext(boolean)),
});

Game.defaultProps = {
  count: 0,
  increaseCount: undefined,
  questions: [],
};

Game.propTypes = {
  count: PropTypes.number,
  countdown: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  increaseCount: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.object),
  retrieveQuestions: PropTypes.func.isRequired,
  refreshTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  toogleNextButton: PropTypes.func.isRequired,
  showNextBtn: PropTypes.bool.isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
