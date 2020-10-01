import { GET_ORDER_DETAILS, CLEAR_ORDER_DETAILS } from '../types/types';
import { OrderState, OrderActionTypes } from '../../appTypes/types';

const initialState: OrderState = {
  details: [],
};

const orders = (state = initialState, action: OrderActionTypes) => {
  switch (action.type) {
    case CLEAR_ORDER_DETAILS:
      return {
        ...initialState,
      };
    case GET_ORDER_DETAILS:
      return {
        ...state,
        details: [...state.details, ...action.payLoad],
      };
    default:
      return state;
  }
};

export default orders;
