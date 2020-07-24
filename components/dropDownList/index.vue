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
      :style="{left:left + 'px',top:setTop + 26 + 'px','transform-origin':placement}"
    >
      <div
        v-for="(item,index) in dataList"
        class="drop-list-row"
        :key="index"
        @click="selectItem(item.name)"
      >
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
    // 滚动条滚动
    scrollTop: { type: Number, default: 0 },
  },
  data() {
    return {
      // 页面高度
      innerHeight: 0,
      // 设置高度
      setTop: 0,
      // 提示框出现的位置
      placement: "center top",
    };
  },
  watch: {
    top: {
      handler(value) {
        const height = this.dataList.length * 35;
        this.placement = "center top";
        if (height + value + 40 > this.innerHeight) {
          this.setTop = value - height - 40 - this.scrollTop;
          this.placement = "center bottom";
        } else this.setTop = value - this.scrollTop;
      },
      immediate: true,
    },
    scrollTop: {
      handler(value) {
        const height = this.dataList.length * 35;
        this.placement = "center top";
        if (height + this.top + 40 > this.innerHeight) {
          this.setTop = this.top - height - 40 - value;
          this.placement = "center bottom";
        } else this.setTop = this.top - value;
      },
      immediate: true,
    },
  },
  mounted() {
    this.innerHeight = window.innerHeight;
    this.$refs.listWrap.addEventListener(
      "mouseenter",
      () => {
        this.$emit("on-open");
      },
      false,
    );
    this.$refs.listWrap.addEventListener(
      "mouseleave",
      () => {
        if (this.show) this.$emit("on-close");
      },
      false,
    );
  },
  methods: {
    selectItem(name) {
      this.$emit("on-close");
      this.$emit("on-click", name);
    },
  },
};
</script>


<style scoped>
.drop-list-wrap {
  position: fixed;
  padding: 5px 0;
  width: 101px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  left: 600px;
  z-index: 1998;
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
