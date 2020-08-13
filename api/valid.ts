import { axios } from '@/utils/api';

// 验证 requestId
export const _verifyRequestId = (requestId: any, params: any) => axios.$get(`/valid/${requestId}`, { params });

// 验证文章存在
export const _validArticle = (params: any) => axios.$get('/valid/article', { params });
