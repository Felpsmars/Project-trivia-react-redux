import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../css/buttonCss.css';
import { answeredQuestion, increaseScore as increaseScoreAction,
  resetTimer, showNext } from '../redux/actions';

const THREE = 3;
const QUESTION_WEIGHT = [1, 2, THREE];
const QUESTION_BASE_POINT = 10;
class CardGame extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   timer: false,
    // }

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    // this.shuffleArray = this.shuffleArray.bind(this);
    this.parseAnswerInObject = this.parseAnswerInObject.bind(this);
    this.generateAnswersButtons = this.generateAnswersButtons.bind(this);
    this.defineQuestionDifficulty = this.defineQuestionDifficulty.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleWrongClick = this.handleWrongClick.bind(this);
    this.saveLocalStorePlayerData = this.saveLocalStorePlayerData.bind(this);
  }

  parseAnswerInObject() {
    const { question } = this.props;
    const answers = [question.correct_answer, ...question.incorrect_answers];
    const answersObjects = answers.map((answer, index) => {
      if (index === 0) {
        return {
          answer,
          correct: true,
        };
      }
      return {
        answer,
        correct: false,
      };
    });
    // const randomAnswers = this.shuffleArray(answersObjects);
    return answersObjects;
  }

  // shuffleArray(array) {
  //   const arr = array;
  //   for (let index = arr.length - 1; index > 0; index -= 1) {
  //     const nextIndex = Math.floor(Math.random() * (index + 1));
  //     const temp = arr[index];
  //     arr[index] = arr[nextIndex];
  //     arr[nextIndex] = temp;
  //   }
  //   return arr;
  // }

  handleRightClick() {
    const { increaseScore, name, email,
      countdown, playerScore, playerAssertions } = this.props;

    const score = Number(playerScore
        + (QUESTION_BASE_POINT
          + (Number(countdown) * Number(this.defineQuestionDifficulty()))));
    increaseScore({
      score,
      assertions: playerAssertions + 1,
      name,
      email,
    });
  }

  handleWrongClick() {
    const { increaseScore, name, email,
      playerScore, playerAssertions } = this.props;
    increaseScore({
      score: playerScore,
      assertions: playerAssertions,
      name,
      email,
    });
  }

  // toogleNextButton() {
  //   this.setState(({ timer }) => ({ timer: !timer }));
  // }
  // encode feito com base em código do Lucas Rodrigues da Turma 08
  // código fornecido pelo aluno Michael Caxias, da turma 14-b

  encodeUtf8(string) {
    const stringUTF = unescape(encodeURIComponent(string));
    return stringUTF.replace(/&quot;|&#039;/gi, '\'');
  }

  saveLocalStorePlayerData() {
    const { game } = this.props;
    localStorage.setItem('state', JSON.stringify(game));
  }

  async handleAnswerClick() {
    const { toogleNextButton, answered } = this.props;
    const brothers = document.querySelectorAll('button');

    // getAttribute feito com base no stackoverflow
    brothers.forEach((brother) => {
      if (brother === brothers[brothers.length - 1]) {
        brother.className = '';
      } else if (brother.getAttribute('data-testid') === 'correct-answer') {
        brother.classList.add('right-answer');
      } else if (brother.getAttribute('data-testid').includes('wrong-answer')) {
        brother.classList.add('wrong-answer');
      }
    });
    toogleNextButton(true);
    await answered(true);
    // await this.saveLocalStorePlayerData()
  }

  generateAnswersButtons() {
    const { timer } = this.props;
    const randomAnswers = this.parseAnswerInObject();
    let count = 0;
    return (randomAnswers.length === 0
      ? <span>loading...</span>
      : randomAnswers.map((answerButton, index) => {
        if (answerButton.correct) {
          return (
            <button
              type="button"
              data-testid="correct-answer"
              onClick={ async () => {
                await this.handleAnswerClick();
                await this.handleRightClick();
                await this.saveLocalStorePlayerData();
              } }
              disabled={ timer }
            >
              { this.encodeUtf8(answerButton.answer) }
            </button>);
        }
        count += 1;
        return (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${count - 1}` }
            onClick={ async () => {
              await this.handleAnswerClick();
              await this.handleWrongClick();
              await this.saveLocalStorePlayerData();
            } }
          >
            {this.encodeUtf8(answerButton.answer)}
          </button>
        );
      }));
  }

  defineQuestionDifficulty() {
    const { question: { difficulty } } = this.props;
    if (difficulty === 'easy') {
      return QUESTION_WEIGHT[0];
    } if (difficulty === 'medium') {
      return QUESTION_WEIGHT[1];
    } if (difficulty === 'hard') {
      return QUESTION_WEIGHT[2];
    }
  }

  render() {
    const { question: { category, question }, next, showNextBtn } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{ category }</h2>
        <h3 data-testid="question-text">{this.encodeUtf8(question) }</h3>
        {this.generateAnswersButtons()}
        <button
          style={ { display: showNextBtn ? 'inline-block' : 'none' } }
          type="button"
          data-testid="btn-next"
          onClick={ () => { next(); } }
        >
          Proxima
        </button>
        <div />
      </div>
    );
  }
}

const mapStateToProps = ({ user, game, game: { player } }) => ({
  name: user.name,
  email: user.email,
  timer: game.timer,
  showNextBtn: game.next,
  playerScore: player.score,
  playerAssertions: player.assertions,
  countdown: game.countdown,
  player,
  game,
});

const mapDispatchToProps = (dispatch) => ({
  toogleNextButton: (boolean) => dispatch(showNext(boolean)),
  stopTimer: (boolean) => dispatch(resetTimer(boolean)),
  increaseScore: (playerObj) => dispatch(increaseScoreAction(playerObj)),
  answered: (boolean) => dispatch(answeredQuestion(boolean)),
});

CardGame.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.any),
    difficulty: PropTypes.string,
  }).isRequired,
  next: PropTypes.func.isRequired,
  timer: PropTypes.bool.isRequired,
  toogleNextButton: PropTypes.func.isRequired,
  showNextBtn: PropTypes.bool.isRequired,
  increaseScore: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
  playerScore: PropTypes.number.isRequired,
  playerAssertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  answered: PropTypes.bool.isRequired,
  game: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardGame);
