export default function({ $axios, store }) {

  $axios.onRequest(config => {
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log(store.state.token.token);
    config.headers['X-XSRF-TOKEN'] = store.state.token.token;
  });
  $axios.interceptors.response.use(
    response => {
      const { code, msg } = response.data;
      if (code === 200 && msg === 'OK') {
        return response;
      }
      console.log('错误');
      return Promise.reject(code);
    },
    error => {},
  );
}
