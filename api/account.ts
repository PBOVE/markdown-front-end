import { axios } from '@/utils/api';
const header = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } };
const fileHeader = { headers: { 'Content-Type': 'multipart/form-data' } };

// 获取邮箱验证
export const sendVerifyEmail = () => axios.$get('/account/email/link');

// 忘记密码
export const sendForgetEmail = (params: any) => axios.$get('/account/password/link', { params });

// 验证邮箱连接
export const verifyEmailLink = (id: any) => axios.$put(`/account/email/${id}`);

// 验证忘记密码
export const forgetEmailLink = (id: any, params: any) => axios.$put(`/account/password/${id}`, params, header);

// 上传文件
export const uploadFile = (params: any) => axios.$post('/storage', params, fileHeader);

// 修改邮箱地址
export const updateEmail = (params: any) => axios.$put('account/email', params);
