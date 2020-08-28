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
});

export const mutations = {
  setAuthor(state, data) {
    state.author = JSON.parse(JSON.stringify(data));
  },
  setArticle(state, data) {
    state.article = JSON.parse(JSON.stringify(data));
  },
  // 设置选中 Post
  setSelectPost(state, data) {
    state.selectPost = JSON.parse(JSON.stringify(data));
  },
  // 设置目录
  setArticleList(state, data) {
    const list = JSON.stringify(data);
    state.list = JSON.parse(list);
  },
  // 设置首页目录
  setPostList(state, data) {
    const list = JSON.stringify(data);
    state.postList = JSON.parse(list);
  },
  // 设置父亲目录
  setParentList(state, data) {
    const list = JSON.stringify(data);
    state.parentList = JSON.parse(list);
  },
};
export const getters = {
  storeAuthorUser(state) {
    return state.author;
  },
  storeAuthorNumber(state) {
    return state.author;
  },
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
};
