/**
*
*  @author ZTiger
*
*/


<template>
  <transition name="drop">
    <div
      class="drop-list-wrap"
      ref="listWrap"
      v-show="show"
      :style="{left:left + 'px',top:top + 26 + 'px'}"
    >
      <div v-for="(item,index) in dataList" class="drop-list-row" :key="index">
        <img :src="item.src" class="drop-list-img" />
        <div>{{item.name}}</div>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      },
    },
    // 偏移量
    left: { type: Number, default: 0 },
    top: { type: Number, default: 0 },
    show: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
  mounted() {
    document.addEventListener(
      "click",
      () => {
        if (this.show) this.$emit("on-close");
      },
      true,
    );
  },
  methods: {},
};
</script>


<style scoped>
.drop-list-wrap {
  position: fixed;
  padding: 5px 0;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  left: 600px;
  z-index: 1998;
  transform-origin: center top;
}
.drop-list-row {
  display: flex;
  padding: 7px 10px;
  cursor: pointer;
}
.drop-list-row:hover {
  background: #f3f3f3;
}
.drop-list-img {
  margin: 0 7px 0 0;
  width: 18px;
  height: 18px;
}
.drop-enter-active,
.drop-leave-active {
  transition: all 0.3s ease-in-out;
}
.drop-enter,
.drop-leave-to {
  transform: scale(1, 0);
  opacity: 0;
}
</style>
