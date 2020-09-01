import { axios } from '@/utils/api';
const header = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } };
const config = { progress: false };

// 获取知识库
export const _queryArticle = (params: any) => axios.$get('/article', { params, ...config });

// 创建知识库
export const _newArticle = (params: any) => axios.$post('/article', params, header);

// 更新知识库
export const _updateArticle = (params: any) => axios.$put('/article', params, header);

// 删除知识库
export const _deleteArticle = (params: any) => axios.$delete('/article', { data: params });

// 处理点赞
export const _articleLike = (params: any) => axios.$post('/article/like', params, header);

// 删除点赞
export const _articleUnLike = (params: any) => axios.$delete('/article/like', { data: params });

// 获取文章内容
export const _articleDetails = (params: any) => axios.$get('/article/details', { params });

// 文章用户查询
export const _queryArticleUser = (params: any) => axios.$get('/article/user', { params });

// 文章删除用户
export const _deleteArticleUser = (params: any) => axios.$delete('/article/user', { params });
