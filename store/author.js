import { cloneDeep } from 'lodash';
export const namespaced = true;

export const state = () => ({
  // 用户信息,点赞数量
  author: {},
  // 文档信息
  article: {},
  // 选中 post
  selectPost: {},
  // 目录
  list: [],
  postList: [],
  parentList: [],
  // 锚点
  customAnchor: []
});

export const mutations = {
  setAuthor(state, data) {
    state.author = cloneDeep(data);
  },
  setArticle(state, data) {
    state.article = cloneDeep(data);
  },
  // 设置选中 Post
  setSelectPost(state, data) {
    state.selectPost = cloneDeep(data);
  },
  // 设置目录
  setArticleList(state, data) {
    state.list = cloneDeep(data);
  },
  // 设置首页目录
  setPostList(state, data) {
    state.postList = cloneDeep(data);
  },
  // 设置父亲目录
  setParentList(state, data) {
    state.parentList = cloneDeep(data);
  },
  // 设置锚点
  setCustomAnchor(state, data) {
    state.customAnchor = cloneDeep(data);
  }
};
export const getters = {
  // 作者
  storeAuthor(state) {
    return state.author;
  },
  // 地方
  storeAuthorLocaltion(state) {
    return state.author.location;
  },
  storeArticle(state) {
    return state.article;
  },
  storeEdit(state) {
    return state.article.edit;
  },
  storeFormat(state) {
    return state.article.format;
  },
  storeSelectPost(state) {
    return state.selectPost;
  },
  storeArticleList(state) {
    return state.list;
  },
  storePostList(state) {
    return state.postList;
  },
  storeParentList(state) {
    return state.parentList;
  },
  storeCustomAnchor(state) {
    return state.customAnchor;
  }
};
