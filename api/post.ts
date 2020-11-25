import { axios } from '@/utils/api';
const header = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } };
const config = { progress: false };

// 更新文章
export const updateContent = (params: any) => axios.$put('/post/content', params, header);

// 获取列表
export const queryPostList = (params: any) => axios.$get('/post/list', { params, ...config });

// 获取列表 根
export const queryPostListRoot = (params: any) => axios.$get('/post/list/root', { params, ...config });

// 获取列表
export const queryPostListParent = (params: any) => axios.$get('/post/list/parent', { params, ...config });

// 获取列表内容
export const queryPostDetails = (params: any) => axios.$get('/post/details', { params });

// 创建文章列表
export const newPost = (params: any) => axios.$post('/post', params, header);

// 更新文章列表
export const updatePost = (params: any) => axios.$put('/post', params, header);

// 删除文章文章列表
export const deletePost = (params: any) => axios.$request({ url: '/post', method: 'delete', data: params });
