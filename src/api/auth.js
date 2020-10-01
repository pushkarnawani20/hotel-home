import axios from 'axios';
import { API_END_POINT } from '../config/project-config';

const signInUser = loginData => {
  return axios
    .post(`${API_END_POINT}users/signin`, { ...loginData })
    .then(response => response.data)
    .catch(error => error.response);
};

const signUpUser = signUpData => {
  return axios
    .post(`${API_END_POINT}users/signup`, { ...signUpData })
    .then(response => response.data)
    .catch(error => error.response);
};

export { signInUser, signUpUser };
