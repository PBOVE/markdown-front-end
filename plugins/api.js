import qs from 'qs';

const header = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } };

const request = {
  // 获取 token
  GetToken: () => axios.get('user/me'),
  // 登录
  LoginIn: params => axios.post('/login', qs.stringify(params)),
  // 查询 注册
  registerQuery: params => axios.get('/register/query', { params }),
  // 注册
  register: params => axios.post('/register', params, header),
  // 获取邮箱验证
  verifyEmail: () => axios.get('/confirm-email'),
};

//2) 定义axios变量等待接收axios,保证axios可用
let axios = null;
export default ({ $axios, store }, inject) => {
  //3 保存内置的axios
  axios = $axios;
  axios.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  axios.onRequest(config => {
    config.headers['X-XSRF-TOKEN'] = store.state.token.access_token;
  });
  axios.onResponse(response => {
    const { code, msg } = response.data;
    if (code === 200 && msg === 'OK') {
      return response.data;
    }
    return Promise.reject(code);
  });
  //4) 将自定义函数交于nuxt
  inject('request', request);
};
