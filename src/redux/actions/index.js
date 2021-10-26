import getQuestions from '../../services/fetchQuestionsAPI';

export const LOGIN_INFO = 'LOGIN_INFO';
export const ADD_COUNT = 'ADD_COUNT';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const STOP_TIMER = 'STOP_TIMER';
export const REFRESH_TIMER = 'REFRESH_TIMER';
export const SHOW_NEXT = 'SHOW_NEXT';
export const SAVE_PLAYER_INFO = 'SAVE_PLAYER_INFO';
export const INCREASE_SCORE = 'INCREASE_SCORE';
export const ANSWERED = 'ANSWERED';

export const loginInfo = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

export const addCount = (payload) => ({
  type: ADD_COUNT,
  payload,
});

export const getQuestionsApi = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const fetchQuestions = (token) => async (dispatch) => {
  const questions = await getQuestions(token);
  dispatch(getQuestionsApi(questions));
};

export const resetTimer = (payload) => ({
  type: STOP_TIMER,
  payload,
});

export const refreshTimer = (payload) => ({
  type: REFRESH_TIMER,
  payload,
});

export const showNext = (payload) => ({
  type: SHOW_NEXT,
  payload,
});

export const savePlayerInfo = (payload) => ({
  type: SAVE_PLAYER_INFO,
  payload,
});

export const increaseScore = (payload) => ({
  type: INCREASE_SCORE,
  payload,
});

export const answeredQuestion = (payload) => ({
  type: ANSWERED,
  payload,
});
