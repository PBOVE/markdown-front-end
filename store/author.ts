export const namespaced = true;

export const state = () => ({
  // 用户信息,点赞数量
  author: {},
  // 项目信息
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
    return state.author.user;
  },
  storeAuthorNumber(state: any) {
    return state.author.number;
  },
  storeProject(state: any) {
    return state.project;
  },
};
