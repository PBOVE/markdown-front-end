/**
*
*  @author ZTiger
*
*/

<template>
  <div class="index-wrap">
    <div class="index-content">
      <div class="index-left">
        <div class="index-list-wrap border">
          <div class="index-list-header">
            <span class="index-title index-page-flex-middle">
              <img src="@/assets/svg/link.svg" class="index-title-img" />
              <nuxt-link :to="projectLink" class="index-title-link">{{ storeArticle.title }}</nuxt-link>
              <div v-for="(item, index) in storeParentList" :key="item._id">
                <span class="split-line">/</span>
                <nuxt-link
                  v-if="storeParentList.length - 1 !== index"
                  class="index-title-link"
                  :to="projectLink + '/tree/' + item._id"
                >{{ item.name }}</nuxt-link>
                <span v-else>{{ item.name }}</span>
              </div>
            </span>
            <div class="index-select-icon">
              <Icon type="md-arrow-round-back" :class="{unselect:!left}" />
              <Icon type="md-arrow-round-forward" :class="{unselect:!right}" />
            </div>
          </div>
          <index-list />
        </div>
        <nuxt-child />
      </div>
      <div class="index-right">
        <div v-if="titles.lengrh" class="index-right-header">目录</div>
        <div
          v-for="(anchor,index) in titles"
          :key="index"
          class="index-titles index-page-flex-middle"
          :style="{ padding: `8px 0 8px ${anchor.indent * 15}px` }"
          :title="anchor.title"
          @click="handleAnchorClick(anchor)"
        >
          <span class="index-text-hidden">{{ anchor.title }}</span>
        </div>
      </div>
    </div>
    <BackTop />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import indexList from '@/components/_path/indexList.vue';

export default {
  transition: 'fade',
  components: { indexList },
  data() {
    return {
      // 标题
      titles: [],
      // 右
      right: '',
      // 左
      left: '',
    };
  },
  computed: {
    ...mapGetters('author', ['storeArticle', 'storeFormat', 'storeParentList']),
    updateUser() {
      return this.storeArticle.updateUser;
    },
    projectLink() {
      return `/${this.storeArticle.author}/${this.storeArticle.path}`;
    },
    IslistId() {
      return !this.$route.params.id;
    },
  },
  mounted() {
    // const { format } = this.storeArticle;
    // if (format === "richText") {
    //   this.handleRTitles();
    // } else if (format === "markdown") {
    //   this.$nextTick(() => {
    //     this.handleMTitles();
    //   });
    // }
  },
  methods: {
    // 处理 mankdown 语法编辑目录
    handleMTitles() {
      const anchors = this.$refs.editor.$el.querySelectorAll(
        '.v-md-editor-preview h1,h2,h3,h4,h5,h6',
      );
      const titles = Array.from(anchors).filter(
        title => !!title.textContent.trim(),
      );
      if (!titles.length) {
        this.titles = [];
        return;
      }
      const hTags = Array.from(
        new Set(titles.map(title => title.tagName)),
      ).sort();
      this.titles = titles.map(el => ({
        title: el.textContent,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName),
      }));
    },
    // 处理富文本编辑器
    handleRTitles() {
      const anchors = this.$refs.editor.querySelectorAll('h1,h2,h3,h4,h5,h6');
      const titles = Array.from(anchors).filter(
        title => !!title.textContent.trim(),
      );
      if (!titles.length) {
        this.titles = [];
        return;
      }
      const hTags = Array.from(
        new Set(titles.map(title => title.tagName)),
      ).sort();
      this.titles = titles.map((el, index) => {
        el.setAttribute('data-v-rt-line', index + 1);
        return {
          title: el.textContent,
          lineIndex: el.getAttribute('data-v-rt-line'),
          indent: hTags.indexOf(el.tagName),
        };
      });
    },
    // 处理点击
    handleAnchorClick(anchor) {
      const { editor } = this.$refs;
      const { lineIndex } = anchor;
      const { format } = this.storeArticle;
      let heading;
      if (format === 'richText') {
        heading = editor.querySelector(
          `.richText [data-v-rt-line="${lineIndex}"]`,
        );
      } else if (format === 'markdown') {
        heading = editor.$el.querySelector(
          `.v-md-editor-preview [data-v-md-line="${lineIndex}"]`,
        );
      }
      if (heading) {
        this.previewScrollToTarget(heading);
      }
    },
    // 处理滚动位置
    previewScrollToTarget(heading) {
      const pos = this.$elementOffset(heading);
      window.scrollTo({
        top: pos.top - 100,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style scoped>
.index-wrap {
  height: 100%;
}
.index-content {
  display: flex;
  margin: 0 auto;
  padding: 35px 0;
  max-width: 1200px;
  width: 100%;
}

.index-left {
  flex-shrink: 0;
  width: 75%;
}
.index-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #dcdee2;
  background-color: #f1f8ff;
  word-break: break-all;
}

.index-right {
  flex: 1;
  width: 25%;
  padding: 0 0 0 20px;
}
.index-right-header {
  padding: 16px 0;
  font-weight: 600;
}
.index-titles {
  cursor: pointer;
}
.index-titles::before {
  content: '';
  display: inline-block;
  margin: 0 5px 0;
  width: 5px;
  height: 5px;
  background: #000;
  border-radius: 50%;
}
.index-titles:hover {
  background: #f8f8f9;
}
.border {
  margin: 0 0 20px 0;
  border: 1px solid #c8e1ff;
  border-radius: 8px;
  overflow: hidden;
}
.unselect,
.unselect :hover {
  color: #c5c8ce !important;
  cursor: default !important;
}
.index-title {
  flex-wrap: wrap;
}
.index-title-link:hover {
  text-decoration: underline;
}
.index-title-img {
  width: 20px;
  height: 20px;
  margin: 0 16px 0 0;
}
.index-select-icon {
  flex-shrink: 0;
}
.index-select-icon i:first-of-type {
  margin: 0 10px 0 0;
}
.index-select-icon i {
  font-size: 16px;
  cursor: pointer;
}
.index-select-icon i:hover {
  color: #2d8cf0;
}
.index-home {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
}
.split-line {
  margin: 0 0px 0 3px;
}
@media screen and (max-width: 1240px) {
  .index-content {
    padding: 35px 20px;
    margin: 0;
  }
}
@media screen and (max-width: 800px) {
  .index-left {
    width: 100%;
  }
  .index-right {
    display: none;
  }
}
</style>
