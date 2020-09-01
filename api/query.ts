import { axios } from '@/utils/api';
const config = { progress: false };

// 查询用户
export const _queryUser = (params:any) => axios.$get('/query/user', { params, ...config });
