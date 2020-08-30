/**
*
*  @author ZTiger
*
*/

<template>
  <div class="select-box-wrap" tabindex="0" @blur="listShow=false">
    <div ref="listShow" class="select-selection index-page-flex-middle" @click="listShow=!listShow">
      <span style="color:#24292e;font-weight: 500;opacity: .75;">{{ headerTitle }}:</span>
      <span style="margin:0 3px;flex:1;">{{ select }}</span>
      <Icon type="md-arrow-dropdown" />
    </div>
    <transition name="list">
      <div v-show="listShow" class="select-ul-wrap" :style="{width:listWidth,top:top+'px'}">
        <div class="select-ul">
          <div class="select-ul-header border">
            <span>选择{{ headerTitle }}</span>
            <Icon type="md-close" class="select-ul-header-icon" @click="listShow=false" />
          </div>
          <div
            v-for="item in list"
            :key="item.value"
            class="select-li border"
            @click="handleClick(item)"
          >
            <div class="select-li-icon">
              <Icon v-if="item.value===parent" type="md-checkmark" />
            </div>
            <div>{{ item.label }}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'parent',
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    list: { type: Array, default: () => [] },
    parent: { type: [String, Number], default: '' },
    default: { type: String, default: '' },
    headerTitle: { type: String, default: '' },
    listWidth: { type: String, default: '' },
  },
  data() {
    return {
      // 列表展示
      listShow: false,
      // 设置底部
      top: 32,
    };
  },
  computed: {
    select() {
      return this.list.find(el => el.value === this.parent).label;
    },
  },
  mounted() {
    const innerHeight = window.innerHeight;
    const pos = this.$elementOffset(this.$refs.listShow);
    if (pos.top + (this.list.length + 2) * 32 >= innerHeight) {
      this.top = -1 * (this.list.length + 1.7) * 32;
    }
    console.log(pos.top, (this.list.length + 2) * 32, innerHeight);
  },
  methods: {
    handleClick(item) {
      if (this.select === item.label) return;
      this.$emit('input', item.value);
      this.listShow = false;
    },
  },
};
</script>

<style scoped>
.select-box-wrap {
  position: relative;
  display: inline-block;
  outline: 0;
}
.middle-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.select-selection {
  padding: 0 10px;
  min-height: 32px;
  background: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04),
    inset 0 1px 0 hsla(0, 0%, 100%, 0.25);
  border-radius: 4px;

  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  cursor: pointer;
}
.select-selection:hover,
.select-selection:focus {
  background-color: #f3f4f6;
}
.select-ul-wrap {
  position: absolute;
  left: auto;
  right: auto;
  width: 100%;
  font-size: 12px;
  z-index: 10;
  background: #fff;
}
.select-ul {
  margin: 8px 0 0 0;
  width: 100%;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(149, 157, 165, 0.2);
}
.select-li,
.select-li-icon,
.select-ul-header {
  display: flex;
  align-items: center;
}
.select-ul-header {
  justify-content: space-between;
  padding: 7px 7px 7px 16px;
}
.select-ul-header-icon {
  cursor: pointer;
  font-weight: bold;
}
.select-ul-header-icon:hover {
  color: #2d8cf0;
}
.select-li {
  padding: 7px 16px;
  cursor: pointer;
}
.select-li:hover {
  background: #f6f8fa;
}
.select-li-icon {
  width: 12px;
  height: 12px;
  margin: 0 5px 0 0;
}
.border {
  border-bottom: 1px solid #eaecef;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter,
.list-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
