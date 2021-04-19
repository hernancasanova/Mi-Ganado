/* eslint-disable no-undef */
import axios from 'axios';

function config() {
  const token = localStorage.getItem('token');

  const HOSTNAME = window.location.hostname;
  const baseURL = HOSTNAME.substring(0, HOSTNAME.indexOf('.'));

  const instance = axios.create({
    baseURL:'http://localhost:8000/'
    //baseURL: `http://${baseURL}.allremu.test/api/`
    // baseURL: `http://${baseURL}.allremu.test:80/allremu/rest/public/index.php/api/`
  });

  if (token) instance.defaults.headers.common.Authorization = `Bearer ${token}`;

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 400 || error.response.status === 401) {
        return Promise.reject(error.response);
      }
    }
  );

  return instance;
}

export const get = (url, parameters) => {
  const instance = config();
  const datas = {
    params: parameters
  };
  return instance.get(url, parameters);
};

export const post = (url, parameters) => {
  const instance = config();
  return instance.post(url, parameters);
};

export const put = (url, parameters, extraConfig) => {
  const instance = config();
  return instance.put(url, parameters, extraConfig);
};

export const del = url => {
  const instance = config();
  return instance.delete(url);
};
