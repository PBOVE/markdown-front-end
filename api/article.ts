import { axios } from '@/utils/api';
const header = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } };
const config = { progress: false };

// 获取知识库
export const queryArticle = (params: any) => axios.$get('/article', { params, ...config });

// 创建知识库
export const newArticle = (params: any) => axios.$post('/article', params, header);

// 更新知识库
export const updateArticle = (params: any) => axios.$put('/article', params, header);

// 删除知识库
export const deleteArticle = (params: any) => axios.$delete('/article', { data: params });

// 处理点赞
export const articleLike = (params: any) => axios.$post('/article/like', params, header);

// 删除点赞
export const articleUnLike = (params: any) => axios.$delete('/article/like', { data: params });

// 获取文章内容
export const articleDetails = (params: any) => axios.$get('/article/details', { params });

// 文章用户查询
export const queryArticleUser = (params: any) => axios.$get('/article/user', { params });

// 文章删除用户
export const deleteArticleUser = (params: any) => axios.$delete('/article/user', { params });

// 置顶文章
export const updateToppingArticle = (params:any) => axios.$post('/topping/article', params);

// 查询置顶文章
export const queryToppingArticle = (params:any) => axios.$get('/topping/article', { params });
