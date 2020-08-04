/**
*
*  @author ZTiger
*
*/

<template>
  <div class="container" />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  transition: 'fade',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('user', ['storeWeather']),
  },
};
</script>

<style scoped>
</style>
