export const isSingleHotel = (hotelData, inputPropCode) =>
  hotelData.some(hotel => hotel.propCode === inputPropCode);

export const getBestServicesFromList = data =>
  data.filter(service => service.rating === 5 || service.bestsellers);
