/**
*
*  @author ZTiger
*
*/


<template>
  <div class="index-wrap">
    <div class="index-content">
      <div class="index-left">
        <div class="index-left-header">
          <img
            v-if="updateUser.images"
            :src="'/api/storage/preview/' + updateUser.images"
            class="main-user-image"
          />
          <div v-else class="main-user-portrait">{{updateUser.userName|name}}</div>
          <nuxt-link
            :to="'/' + updateUser.userName"
            class="index-left-header-link"
          >{{updateUser.userName}}</nuxt-link>
          <div
            class="index-left-header-time"
            :title="$timeConversion(storeProject.updateTime)"
          >{{storeProject.updateTime|TimeFilter}}</div>
        </div>
        <div v-if="storeFormat==='richText'" ref="editor" v-html="storeContent" class="richText" />
        <client-only v-if="storeFormat==='markdown'">
          <v-md-preview height="100%" ref="editor" :text="storeContent" />
        </client-only>
      </div>
      <div class="index-right">
        <div class="index-right-header">目录</div>
        <div
          v-for="(anchor,index) in titles"
          class="index-titles index-page-flex-middle"
          :key="index"
          :style="{ padding: `8px 0 8px ${anchor.indent * 15}px` }"
          :title="anchor.title"
          @click="handleAnchorClick(anchor)"
        >
          <span class="index-titles-li">{{ anchor.title }}</span>
        </div>
      </div>
    </div>
    <BackTop />
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  transition: "fade",
  filters: {
    name(name) {
      return name ? name[0].toUpperCase() : "";
    },
  },
  data() {
    return {
      // 标题
      titles: [],
    };
  },
  computed: {
    ...mapGetters("author", ["storeProject", "storeContent", "storeFormat"]),
    updateUser() {
      return this.storeProject.updateUser;
    },
  },
  mounted() {
    const { format } = this.storeProject;
    if (format === "richText") {
      this.handleRTitles();
    } else if (format === "markdown") {
      this.$nextTick(() => {
        this.handleMTitles();
      });
    }
  },
  methods: {
    // 处理 mankdown 语法编辑目录
    handleMTitles() {
      const anchors = this.$refs.editor.$el.querySelectorAll(
        ".v-md-editor-preview h1,h2,h3,h4,h5,h6",
      );
      const titles = Array.from(anchors).filter(
        title => !!title.innerText.trim(),
      );
      if (!titles.length) {
        this.titles = [];
        return;
      }
      const hTags = Array.from(
        new Set(titles.map(title => title.tagName)),
      ).sort();
      this.titles = titles.map(el => ({
        title: el.innerText,
        lineIndex: el.getAttribute("data-v-md-line"),
        indent: hTags.indexOf(el.tagName),
      }));
    },
    // 处理富文本编辑器
    handleRTitles() {
      const anchors = this.$refs.editor.querySelectorAll("h1,h2,h3,h4,h5,h6");
      const titles = Array.from(anchors).filter(
        title => !!title.innerText.trim(),
      );
      if (!titles.length) {
        this.titles = [];
        return;
      }
      const hTags = Array.from(
        new Set(titles.map(title => title.tagName)),
      ).sort();
      this.titles = titles.map((el, index) => {
        el.setAttribute("data-v-rt-line", index + 1);
        return {
          title: el.innerText,
          lineIndex: el.getAttribute("data-v-rt-line"),
          indent: hTags.indexOf(el.tagName),
        };
      });
    },
    // 处理点击
    handleAnchorClick(anchor) {
      const { editor } = this.$refs;
      const { lineIndex } = anchor;
      const { format } = this.storeProject;
      let heading;
      if (format === "richText") {
        heading = editor.querySelector(
          `.richText [data-v-rt-line="${lineIndex}"]`,
        );
      } else if (format === "markdown") {
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
        behavior: "smooth",
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
.richText {
  padding: 20px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.index-left {
  flex-shrink: 0;
  width: 75%;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
}
.index-left-header {
  display: flex;
  align-items: center;
  margin: -1px -1px 0;
  padding: 16px;
  background-color: #f1f8ff;
  border: 1px solid #c8e1ff;
  border-radius: 8px 8px 0 0;
}
.index-left-header-link {
  margin: 0 10px;
  color: #000;
}
.index-left-header-link:hover {
  text-decoration: underline;
}
.index-left-header-time {
  color: #586069;
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
  content: "";
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
.index-titles-li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
<style >
.richText table {
  border: 1px dashed #bbb;
  border-collapse: collapse;
}
.richText td {
  border: 1px dashed #bbb;
  padding: 0.4rem;
}
.richText p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
