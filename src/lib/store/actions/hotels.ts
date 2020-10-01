import { ThunkAction } from 'redux-thunk';
import {
  ADD_HOTELS,
  ADD_SINGLE_HOTEL,
  SET_SELECTED_SERVICE,
  LOADING,
} from '../types/types';
import { searchHotels, getHotelsByPropCode } from '../../../api/hotels';

export const fetchHotels = (): ThunkAction<void, any, any, any> => dispatch => {
  searchHotels().then(res => {
    dispatch({
      type: ADD_HOTELS,
      payLoad: res.data,
    });
  });
};

export const fetchHotelById = (
  propCode: string,
): ThunkAction<void, any, any, any> => dispatch => {
  getHotelsByPropCode(propCode).then(res => {
    dispatch({
      type: ADD_SINGLE_HOTEL,
      payLoad: res.data,
    });
  });
};

export const setSelectedService = (payLoad: string) => ({
  type: SET_SELECTED_SERVICE,
  payLoad,
});
export const setPageLoadding = (payLoad: boolean) => ({
  type: LOADING,
  payLoad,
});
