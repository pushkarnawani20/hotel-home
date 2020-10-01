import { GET_ORDER_DETAILS, CLEAR_ORDER_DETAILS } from '../types/types';
import { getOrderDetails } from '../../../api/checkout';

export const getOrderDetail = (data: any) => dispatch => {
  dispatch({
    type: CLEAR_ORDER_DETAILS,
  });
  getOrderDetails(data).then(res => {
    dispatch({
      type: GET_ORDER_DETAILS,
      payLoad: res.data,
    });
  });
};
