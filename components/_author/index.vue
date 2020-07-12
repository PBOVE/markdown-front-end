/**
*
*  @author ZTiger
*
*/


<template>
  <div class="container"></div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  transition: "fade",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["storeWeather"]),
  },
};
</script>


<style scoped>
</style>
