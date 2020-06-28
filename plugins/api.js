import qs from 'qs';
import { Message } from 'view-design';
import showStatus from '@/utils/message';

const header = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } };
const fileHeader = { headers: { 'Content-Type': 'multipart/form-data' } };

const request = {
  // 获取 token
  GetToken: () => axios.get('/user/me'),
  // 更新用户信息
  updataUserMsg: params => axios.put('/user/me', params, header),
  // 修改密码
  password: params => axios.put('/user/me/password', params),
  // 用户查询
  queryUser: params => axios.get('/user/query', { params }),
  // 登录
  LoginIn: params => axios.post('/user/login', params, header),
  // 退出
  LoginOut: () => axios.post('/user/logout'),
  // 删除账户
  deleteAccount: params => axios.delete('/user/me', { data: params }),
  // 获取邮箱验证
  verifyEmail: () => axios.get('/accounts/email/link'),
  // 忘记密码
  forgetEmail: params => axios.get('/accounts/password/link', { params }),
  // 验证邮箱连接
  verifyEmailLink: requestId => axios.put(`/accounts/email/${requestId}`),
  // 验证忘记密码
  forgetEmailLink: (requestId, params) => axios.put(`/accounts/password/${requestId}`, params, header),
  // 查询 注册
  registerQuery: params => axios.get('/register/query', { params }),
  // 注册
  register: params => axios.post('/register', params, header),
  // 验证 requestId
  verifyRequestId: (requestId, params) => axios.get(`/valid/${requestId}`, { params }),
  // 上传文件
  uploadFile: data => axios.post(`/storage`, data, fileHeader),
  // 获取项目
  getProject: params => axios.get('/article', { params }),
  // 创建项目
  createProject: params => axios.post('/article', params, header),
  // 处理点赞
  projectLike: params => axios.post('/article/like', params, header),
  // 删除点赞
  projectUnLike: params => axios.delete('/article/like', { data: params }, header),
};

//2) 定义axios变量等待接收axios,保证axios可用
let axios = null;
export default ({ $axios, store }, inject) => {
  const isClient = process.client;
  // let isServer = process.server;
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
  axios.onError(error => {
    if (isClient) {
      let message;
      if (typeof error === 'number') {
        message = showStatus(error);
      } else {
        const { status } = error.response;
        message = showStatus(status);
      }
      Message.error({ content: message, duration: 10, background: true });
    }
  });
  //4) 将自定义函数交于nuxt
  inject('request', request);
};
