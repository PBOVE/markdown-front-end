/**
*
*  @author ZTiger
*
*/


<template>
  <div class="index-wrap">
    <client-only>
      <v-md-preview height="100%" :text="storeContent" />
    </client-only>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Prism from "prismjs";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("author", ["storeContent"]),
  },
};
</script>


<style scoped>
.index-wrap {
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
