import axios from 'axios';
import { API_END_POINT } from '../config/project-config';

const searchHotels = () => {
  return axios
    .get(`${API_END_POINT}hotels/search/`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const getHotelsByPropCode = propCode => {
  return axios
    .get(`${API_END_POINT}hotels/by/${propCode}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export { searchHotels, getHotelsByPropCode };
