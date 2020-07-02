/**
*
*  @author ZTiger
*
*/


<template>
  <div class="index-wrap">
    <div v-if="storeFormat==='richText'" v-html="storeContent" class="richText" />
    <client-only>
      <v-md-preview v-if="storeFormat==='markdown'" height="100%" :text="storeContent" />
    </client-only>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("author", ["storeContent", "storeFormat"]),
  },
};
</script>


<style scoped>
.index-wrap {
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.richText{
  padding: 20px;
}
</style>
