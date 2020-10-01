import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../types/types';
import { CartState, CartActionTypes } from '../../appTypes/types';

const initialState: CartState = {
  CartItems: [],
};

const cart = (state = initialState, action: CartActionTypes) => {
  switch (action.type) {
    case CLEAR_CART: {
      return {
        ...initialState,
      };
    }
    case ADD_TO_CART:
      return {
        ...state,
        CartItems: [...state.CartItems, ...action.payLoad],
      };
    case REMOVE_FROM_CART: {
      const newState = state?.CartItems?.filter(
        val => val._id !== action.payLoad,
      );
      return {
        ...state,
        CartItems: [...newState],
      };
    }
    default:
      return state;
  }
};

export default cart;
