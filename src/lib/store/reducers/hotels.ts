import {
  ADD_HOTELS,
  ADD_SINGLE_HOTEL,
  SET_SELECTED_SERVICE,
  LOADING,
} from '../types/types';
import { HotelsProps, HotelsActionTypes } from '../../appTypes/types';

const initialState: HotelsProps = {
  hotelsData: [],
  selectedHotel: {
    hotelImage: [],
    restaurants: [],
    spa: [],
    chefs: [],
    laundry: [],
    hotelName: '',
    propCode: '',
    hotelAddress: '',
    hotelCountry: '',
    hotelCity: '',
    hotelDescription: '',
    rating: 0,
    openingHours: '',
  },
  selectedService: '',
  isLoading: false,
};

const hotels = (state = initialState, action: HotelsActionTypes) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: action.payLoad,
      };
    case ADD_HOTELS:
      return {
        ...state,
        hotelsData: action.payLoad,
      };
    case ADD_SINGLE_HOTEL:
      return {
        ...state,
        selectedHotel: { ...action.payLoad },
      };
    case SET_SELECTED_SERVICE:
      return {
        ...state,
        selectedService: action.payLoad,
      };
    default:
      return state;
  }
};

export default hotels;
