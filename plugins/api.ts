import { initializeAxios } from '@/utils/api';
import { Plugin } from '@nuxt/types';
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import showStatus from '@/utils/message';
import Message from '@/utils/iview';

const accessor: Plugin = ({ app: { $axios, store } }) => {
  initializeAxios($axios);
  $axios.onRequest((config: AxiosRequestConfig) => {
    config.headers['X-XSRF-TOKEN'] = store!.state.token.access_token;
    return config;
  });
  $axios.onResponse((response: AxiosResponse) => {
    const { code, msg } = response.data;
    console.log(code, msg);
    if (code === 200 && msg === 'OK') {
      return Promise.resolve(response);
    } else {
      Message(showStatus(code));
      return Promise.reject(response);
    }
  });
  $axios.onError((error: AxiosError) => {
    const status = error.response?.status;
    if (status === 200) Message(showStatus(status));
  });
};

export default accessor;
