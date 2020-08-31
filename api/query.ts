import { axios } from '@/utils/api';
const config = { progress: false };

// 更新文章
export const _queryUser = (params:any) => axios.$get('/query/user', { params, ...config });
