/**
*
*  @author ZTiger
*
*/


<template>
  <div class="container">000</div>
</template>


<script>
export default {
  validate({ store, params }) {
    return (
      store.state.user.userState &&
      params.author === store.state.user.data.userName
    );
  },
  data() {
    return {};
  },
};
</script>


<style scoped>
</style>
