import {
  LOGIN,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  SIGN_OUT,
  CLEAR_ERROR,
} from '../types/types';
import { UserState, UserActionTypes } from '../../appTypes/types';

const initialState: UserState = {
  fullName: '',
  email: '',
  id: '',
  token: '',
  phoneNumber: '',
  address: '',
  pinCode: '',
  errorList: [],
};

const users = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SIGN_OUT:
      return {
        ...initialState,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        errorList: [...state.errorList, ...action.payLoad],
      };
    case LOGIN:
      return {
        ...state,
        ...action.payLoad,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        errorList: [...state.errorList, action.payLoad],
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errorList: [],
      };
    default:
      return state;
  }
};

export default users;
