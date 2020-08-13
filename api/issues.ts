import { axios } from '@/utils/api';
const textHeader = { headers: { 'Content-Type': 'text/plain' } };

// 获取留言
export const _queryIssues = (params: any) => axios.$get('/issue', { params });

// 获取留言详细
export const _issuesDetails = (id: string) => axios.$get(`/issue/${id}`);

// 创建留言
export const _newIssues = (params: any) => axios.$post('/issue', params);

// 评论
export const _comment = (id: string, data: any) => axios.$post(`/issue/${id}`, data, textHeader);

// 删除留言
export const _deleteIssues = (id: string) => axios.$delete(`/issue/${id}`);
