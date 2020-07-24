export const namespaced = true;

export const state = () => ({
  // 用户信息,点赞数量
  author: {},
  // 知识库信息
  project: {},
  // 内容
  content: '',
  // 选中 post
  selectPost: '',
});
interface Select {
  title: string;
  id: string;
}

export const mutations = {
  setAuthor(state: any, data: any) {
    state.author = data;
  },
  setProject(state: any, data: any) {
    state.project = data;
  },
  // 设置内容
  setContent(state: any, data: string) {
    state.content = data;
  },
  // 设置选中 Post
  setSelectPost(state: any, data: Select) {
    state.selectPost = data;
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
    return state.content;
  },
  storeSelectPost(state: any) {
    return state.selectPost;
  },
};
