import { combineReducers, Reducer } from 'redux';
import hotels from './hotels';
import users from './users';
import cart from './cart';
import order from './orders';
import { ApplicationState } from '../../appTypes/types';

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  hotels,
  users,
  order,
  carts: cart,
});

export default reducers;
