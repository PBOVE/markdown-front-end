import { axios } from '@/utils/api';
const header = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } };
const config = { progress: false };

// 获取 token
export const _token = () => axios.$get('/user/me');

// 登录
export const _login = (params: any) => axios.$post('/user/login', params, header);

// 退出
export const _logout = () => axios.$post('/user/logout');

// 用户查询
export const _queryAccount = (params: any) => axios.$get('/user/query', { params });

// 查询用户点赞
export const _queryAccountLike = (params: any) => axios.$get('/user/like', { params });

// 更新用户信息
export const _updateAccount = (params: any) => axios.$put('/user/me', params, header);

// 修改密码
export const _updatePassword = (params: any) => axios.$put('/user/me/password', params);

// 删除账户
export const _deleteAccount = (params: any) => axios.$delete('/user/me', { data: params });

// 关注用户
export const _followAccount = (params: any) => axios.$post('/user/follow', params);

// 取消关注
export const _unfollowAccount = (params: any) => axios.$delete('/user/follow', { data: params });

// 查询 注册
export const _queryRegister = (params: any) => axios.$get('/register/query', { params, ...config });

// 注册
export const _register = (params: any) => axios.$post('/register', params, header);
