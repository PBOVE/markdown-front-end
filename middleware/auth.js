export default async function({ app, store }) {
  // console.log(context);
  // const { data } = await app.$axios.$get('user/me');
  // const { data } = await app.$api.$GetToken();
  store.commit('token/setToken', data._csrf.token);
  console.log('----data-----');
  console.log(data);
}
