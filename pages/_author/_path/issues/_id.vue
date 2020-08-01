/**
*
*  @author ZTiger
*
*/


<template>
  <div class="container">{{details}}</div>
</template>


<script>
export default {
  validate({ params }) {
    const { id } = params;
    const reg = new RegExp("^[0-9a-fA-F]{24}$");
    return reg.test(id);
  },
  async asyncData({ params, app }) {
    const { id } = params;
    const { data: details } = await app.$request.issuesDetails(id);
    return { details };
  },
  data() {
    return {};
  },
};
</script>


<style scoped>
</style>
