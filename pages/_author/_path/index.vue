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
        <div v-if="storeFormat==='richText'" v-html="storeContent" class="richText" />
        <client-only>
          <v-md-preview v-if="storeFormat==='markdown'" height="100%" :text="storeContent" />
        </client-only>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  filters: {
    name(name) {
      return name ? name[0].toUpperCase() : "";
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("author", ["storeProject", "storeContent", "storeFormat"]),
    updateUser() {
      return this.storeProject.updateUser;
    },
  },
};
</script>


<style scoped>
.index-wrap {
  height: 100%;
}
.index-content {
  margin: 0 auto;
  padding: 35px 0;
  max-width: 1200px;
}
.richText {
  padding: 20px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.4em;
}
.index-left {
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
@media screen and (max-width: 1240px) {
  .index-content {
    margin: 0 20px;
  }
}
@media screen and (max-width: 800px) {
  .index-left {
    width: 100%;
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
