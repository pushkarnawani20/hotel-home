import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../appTypes/types';
import { isSingleHotel } from '../../utils/hotesUtils';
import { fetchHotelById } from '../store/actions/hotels';
import { clearCart } from '../store/actions/cart';

export const useWithHotels = (propCode: string) => {
  const [hasHotel, setHotel] = useState<boolean>(false);
  const { hotelsData } = useSelector((state: ApplicationState) => state.hotels);
  const dispatch = useDispatch();
  useEffect(() => {
    if (hotelsData && hotelsData.length > 0) {
      const isHotelExist = isSingleHotel(hotelsData, propCode);
      if (!isHotelExist) {
        setHotel(true);
        return;
      }
      dispatch(clearCart());
      dispatch(fetchHotelById(propCode));
    }
  }, [hotelsData, propCode, dispatch]);

  return {
    hasHotel,
  };
};
