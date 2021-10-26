import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { refreshTimer,
  resetTimer as resetTimerAction,
  showNext } from '../redux/actions';

const ONE_SECOND = 1000;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
    };
    this.timer = null;
    this.tiktak = this.tiktak.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    this.tiktak();
  }

  countdown() {
    const { countdown, refreshCountdown } = this.props;
    refreshCountdown(countdown - 1);
  }

  tiktak() {
    const { start } = this.state;
    if (!start) {
      this.timer = setInterval(this.countdown, ONE_SECOND);
      this.setState({ start: true });
    } else {
      clearInterval(this.timer);
      this.setState({ start: false });
    }
  }

  render() {
    /* Contador feito pelo Guilherme Gomes 14-b */
    const { resetTimer, countdown, showNextBtn } = this.props;
    if (countdown === 0) {
      clearInterval(this.timer);
      showNextBtn(true);
      resetTimer(true);
    }
    return (<span>{ countdown }</span>);
  }
}

const mapStateToProps = ({ game }) => ({
  timer: game.timer,
  countdown: game.countdown,
  answered: game.answered,
});

const mapDispatchToProps = (dispatch) => ({
  resetTimer: (timer) => dispatch(resetTimerAction(timer)),
  refreshCountdown: (timer) => dispatch(refreshTimer(timer)),
  showNextBtn: (boolean) => dispatch(showNext(boolean)),
});

Timer.defaultProps = {
  showNextBtn: undefined,
};

Timer.propTypes = {
  countdown: PropTypes.number.isRequired,
  refreshCountdown: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  showNextBtn: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
