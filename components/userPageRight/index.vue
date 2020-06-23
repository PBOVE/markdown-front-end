/**
*
*  @author ZTiger
*
*/


<template>
  <div class="page-right">
    <div class="header">
      <div class="header-row">
        <Icon type="ios-book-outline " />概述
      </div>
      <div class="header-row">
        <Icon type="ios-copy-outline" />项目
      </div>
    </div>
    <!-- <div>{{$route.path}}</div> -->
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
};
</script>


<style scoped>
.header {
  display: flex;
}
.header-row {
  padding: 4px 20px 4px 20px;
  font-size: 16px;
  letter-spacing: 0.1rem;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}
.header-row i {
  margin: 0 8px 0 0;
  font-weight: bold;
}
.header-row:hover {
  border-bottom: 2px solid #00000055;
}
/* .border {
 border-bottom: 2px solid #f9826c; 
} */
</style>