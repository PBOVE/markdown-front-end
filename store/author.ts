export const namespaced = true;

export const state = () => ({
  // 用户信息,点赞数量
  author: {},
  // 知识库信息
  project: {},
});

export const mutations = {
  setAuthor(state: any, data: any) {
    state.author = data;
  },
  setProject(state: any, data: any) {
    state.project = data;
  },
};
export const getters = {
  storeAuthorUser(state: any) {
    return state.author;
  },
  storeAuthorNumber(state: any) {
    return state.author;
  },
  storeAuthorLocaltion(state: any) {
    return state.author.location;
  },
  storeProject(state: any) {
    return state.project;
  },
  storeEdit(state: any) {
    return state.project.edit;
  },
  storeFormat(state: any) {
    return state.project.format;
  },
  storeContent(state: any) {
    return state.project.content;
  },
};
