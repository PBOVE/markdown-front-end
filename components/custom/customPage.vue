<template>
  <div class="custom-page-wrap">
    <div class="custom-page-mask"></div>
    <div class="custom-page-content">
      <div class="index-between-modal">
        <h2>自定义您的桌面</h2>
        <div>
          <Button @click="handleClose">关 闭</Button>
        </div>
      </div>
      <Menu mode="horizontal" :active-name="menuSelect" @on-select="handleMenuSelect">
        <MenuItem v-for="(item, index) in menuItem" :key="index" :name="index + 1">
          {{ item.title }}
        </MenuItem>
      </Menu>
      <div class="custom-page-main">
        <topping-page v-show="menuSelect === 1" />
        <assist-page v-show="menuSelect === 2" />
      </div>
    </div>
  </div>
</template>

<script>
import toppingPage from '@/components/custom/toppingPage.vue';
import assistPage from '@/components/custom/assistPage.vue';

export default {
  components: { toppingPage, assistPage },
  transition: 'fade',
  data() {
    return {
      // 列表
      menuItem: [{ title: '置顶文档' }, { title: '协作文档' }],
      // 菜单选择
      menuSelect: 1
    };
  },
  methods: {
    // 处理关闭
    handleClose() {
      this.$emit('on-close', false);
    },
    // 处理选择
    handleMenuSelect(name) {
      this.menuSelect = name;
    }
  }
};
</script>

<style scoped>
.custom-page-wrap {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.custom-page-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000cc;
  z-index: -1;
}
.custom-page-content {
  padding: 50px 50px 0;
  color: #ffffff;
}
.ivu-menu-light {
  background: transparent;
  color: #ffffff;
}
.custom-page-main{
  padding: 20px 0 0;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
}
.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
  color: #2d8cf0;
}
</style>
