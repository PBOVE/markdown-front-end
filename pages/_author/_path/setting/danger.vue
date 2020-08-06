/**
*
*  @author ZTiger
*
*/

<template>
  <div class="delete">
    <div class="setting-delete-header">危险操作</div>
    <Divider />
    <div class="index-between-modal">
      <div class="setting-delete-left">
        <div class="setting-delete-title">文档库可见性</div>
        <div>当前文档库{{ storeProject.share|share }}。</div>
      </div>
      <div class="setting-delete-roght">
        <Button type="error" @click="handleSubmit('share')">更改</Button>
      </div>
    </div>
    <Divider />
    <div class="index-between-modal">
      <div class="setting-delete-left">
        <div class="setting-delete-title">删除</div>
        <div>删除文档库将会连同其相关的所有数据一起删除。</div>
      </div>
      <div class="setting-delete-roght">
        <Button type="error" @click="handleSubmit('delete')">删除</Button>
      </div>
    </div>
    <change-share ref="changeShare" />
    <delete-path ref="deletePath" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import changeShare from '@/components/_path/changeShare.vue';
import deletePath from '@/components/_path/deletePath.vue';

export default {
  filters: {
    share(value) {
      if (value) return '对所有人可见';
      else return '仅自己和文档库成员可见';
    },
  },
  components: { changeShare, deletePath },
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
    };
  },
  computed: {
    ...mapGetters('author', ['storeProject']),
  },
  watch: {
    projectPath(val) {
      if (val === this.storeProject.path) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
  methods: {
    // 处理按键点击
    handleSubmit(type) {
      switch (type) {
        case 'share':
          this.$refs.changeShare.init(this.storeProject.share);
          break;
        case 'delete':
          this.$refs.deletePath.init();
          break;
      }
    },
  },
};
</script>

<style scoped>
.setting-delete-header {
  font-size: 24px;
  padding: 0 0 8px;
}
.setting-delete-title {
  font-size: 14px;
  font-weight: 600;
  margin: 2px 0 0;
}
</style>
