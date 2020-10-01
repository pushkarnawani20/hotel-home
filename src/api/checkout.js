import axios from 'axios';
import { API_END_POINT } from '../config/project-config';

const authCheckout = (data, token) => {
  return axios
    .post(
      `${API_END_POINT}hotels/authCheckout/`,
      {
        ...data,
      },
      {
        headers: {
          'content-Type': 'application/json',
          token: `${token}`,
        },
      },
    )
    .then(response => response.data)
    .catch(error => error.response);
};

const eventBookinng = bookingData => {
  return axios
    .post(`${API_END_POINT}hotels/eventBook`, { ...bookingData })
    .then(response => response.data)
    .catch(error => error.response);
};

const getOrderDetails = userData => {
  return axios
    .post(`${API_END_POINT}hotels/getOrderDetails`, { ...userData })
    .then(response => response.data)
    .catch(error => error.response);
};

export { authCheckout, eventBookinng, getOrderDetails };
