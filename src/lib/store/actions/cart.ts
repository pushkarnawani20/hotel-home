import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  LOADING,
} from '../types/types';
import { authCheckout, eventBookinng } from '../../../api/checkout';

export const addToCart = (payLoad: any) => ({
  type: ADD_TO_CART,
  payLoad,
});

export const removeFromCart = (payLoad: string) => ({
  type: REMOVE_FROM_CART,
  payLoad,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const authCheckoutData = (data: any, token: string, history: any) => (
  dispatch,
  getState,
) => {
  const {
    selectedHotel: { propCode },
  } = getState().hotels;
  authCheckout(data, token).then(() => {
    dispatch({
      type: LOADING,
      payLoad: false,
    });
    dispatch({
      type: CLEAR_CART,
    });
    // eslint-disable-next-line no-unused-expressions
    history?.push(`/hotels/${propCode}/confirmation`);
  });
};

export const withoutAuthCheckout = (
  data: any,
  propCode: string,
  history: any,
) => dispatch => {
  eventBookinng(data).then(res => {
    dispatch({
      type: LOADING,
      payLoad: false,
    });
    if (res?.status === 500) {
      // eslint-disable-next-line no-alert
      alert(res?.data?.message);
    }
    // eslint-disable-next-line no-unused-expressions
    history?.push(`/hotels/${propCode}/confirmation`);
  });
};
