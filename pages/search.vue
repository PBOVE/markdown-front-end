<template>
  <div>
    <public-header :shadow="true" />
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader/index.vue';

export default {
  components: { publicHeader },
  head() {
    return {
      title: ' ● 搜索'
    };
  }
};
</script>

<style>

</style>
