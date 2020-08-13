import { axios } from '@/utils/api';
const header = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } };
const config = { progress: false };

// 更新文章
export const _updateContent = (params: any) => axios.$put('/post/content', params, header);

// 获取列表
export const _queryPostList = (params: any) => axios.$get('/post/list', { params, ...config });

// 获取列表 根
export const _queryPostListRoot = (params: any) => axios.$get('/post/list/root', { params, ...config });

// 获取列表
export const _queryPostListParent = (params: any) => axios.$get('/post/list/parent', { params, ...config });

// 获取列表内容
export const _queryPostDetails = (params: any) => axios.$get('/post/details', { params });

// 创建文章列表
export const _newPost = (params: any) => axios.$post('/post', params, header);

// 更新文章列表
export const _updatePost = (params: any) => axios.$put('/post', params, header);

// 删除文章文章列表
export const _deletePost = (params: any) => axios.$delete('/post', { data: params });
