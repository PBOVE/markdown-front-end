/**
*
*  @author ZTiger
*
*/


<template>
  <div class="container">
    <public-header />
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";

export default {
  transition: "fade",
  components: { publicHeader },
  data() {
    return {};
  },
};
</script>


<style scoped>
</style>
