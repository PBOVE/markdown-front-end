/**
*
*  @author ZTiger
*
*/


<template>
  <AutoComplete
    :style="{display:searchHide?'none':''}"
    placeholder="搜索"
    icon="ios-search"
    v-model="inputData"
    @on-change="contentChange"
  ></AutoComplete>
</template>


<script>
export default {
  props: {
    "search-hide": {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 输入数据
      inputData: "",
      // 搜索数据
      searchData: [],
    };
  },
  methods: {
    // 搜索内容发送变化
    contentChange(value) {
      // console.log(value);
    },
  },
};
</script>


<style scoped>
</style>
