import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getToken from '../services/fetchTokenAPI';
import { loginInfo, savePlayerInfo as savePlayerInfoAction } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleConfigClick = this.handleConfigClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handlePlayClick() {
    const { history, sendUserInfo, savePlayerInfo } = this.props;
    const token = await getToken();
    localStorage.setItem('token', token);
    sendUserInfo(this.state);
    savePlayerInfo(this.state);
    history.push('/game');
  }

  handleConfigClick() {
    const { history } = this.props;
    history.push('/config');
  }

  isEmailValid(email) {
    // função feita a partir de dica do Michael Caxias
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email);
  }

  render() {
    const { name, email } = this.state;
    const validate = (this.isEmailValid(email) && name.length > 0);
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            id="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            id="email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.handlePlayClick }
          data-testid="btn-play"
          disabled={ !validate }
        >
          Jogar
        </button>
        <button
          type="button"
          onClick={ this.handleConfigClick }
          data-testid="btn-settings"
        >
          Configurar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendUserInfo: (payload) => dispatch(loginInfo(payload)),
  savePlayerInfo: (info) => dispatch(savePlayerInfoAction(info)),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  sendUserInfo: PropTypes.func.isRequired,
  savePlayerInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
