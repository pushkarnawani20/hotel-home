import { ThunkAction } from 'redux-thunk';
import {
  LOGIN,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  CLEAR_ERROR,
  SIGN_OUT,
} from '../types/types';
import { signInUser, signUpUser } from '../../../api/auth';
import {
  ApplicationState,
  UserLoginState,
  UserSignUpState,
} from '../../appTypes/types';

export const loginIn = (
  loginData: UserLoginState,
  history: any,
): ThunkAction<void, ApplicationState, any, any> => (dispatch, getState) => {
  const {
    selectedService,
    selectedHotel: { propCode },
  } = getState().hotels;

  signInUser(loginData).then(res => {
    dispatch({
      type: CLEAR_ERROR,
    });
    if (res?.status === 400) {
      dispatch({
        type: LOGIN_ERROR,
        payLoad: res.data.message,
      });
    } else {
      dispatch({
        type: LOGIN,
        payLoad: res,
      });
      if (selectedService && selectedService !== '') {
        // eslint-disable-next-line no-unused-expressions
        history?.push(`/hotels/${propCode}/checkout`);
      } else {
        // eslint-disable-next-line no-unused-expressions
        history?.push(`/home`);
      }
    }
  });
};

export const signUpUsers = (
  signUpData: UserSignUpState,
  history: any,
): ThunkAction<void, ApplicationState, any, any> => dispatch => {
  signUpUser(signUpData).then(res => {
    dispatch({
      type: CLEAR_ERROR,
    });
    if (res?.status === 400) {
      const { data } = res?.data;
      dispatch({
        type: SIGNUP_ERROR,
        payLoad: data,
      });
    } else {
      // eslint-disable-next-line no-unused-expressions
      history?.push(`/signin`);
    }
  });
};

export const signOut = () => ({
  type: SIGN_OUT,
});
