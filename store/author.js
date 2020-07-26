export const namespaced = true;

export const state = () => ({
  // 用户信息,点赞数量
  author: {},
  // 知识库信息
  project: {},
  // 内容
  content: '',
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
  setProject(state, data) {
    state.project = JSON.parse(JSON.stringify(data));
  },
  // 设置内容
  setContent(state, data) {
    state.content = data;
  },
  // 设置选中 Post
  setSelectPost(state, data) {
    state.selectPost = JSON.parse(JSON.stringify(data));
  },
  // 设置目录
  setProjectList(state, data) {
    const list = JSON.stringify(data);
    state.list = JSON.parse(list);
    state.postList = JSON.parse(list);
  },
  // 设置首页目录
  setPostList(state, data) {
    const list = JSON.stringify(data);
    state.postList = JSON.parse(list);
  },
  // 设置首页目录
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
  storeProject(state) {
    return state.project;
  },
  storeEdit(state) {
    return state.project.edit;
  },
  storeFormat(state) {
    return state.project.format;
  },
  storeContent(state) {
    return state.content;
  },
  storeSelectPost(state) {
    return state.selectPost;
  },
  storeProjectList(state) {
    return state.list;
  },
  storePostList(state) {
    return state.postList;
  },
  storeParentList(state) {
    return state.parentList;
  },
};
