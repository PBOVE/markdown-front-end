<template>
  <div class="search-list-wrap">
    <div v-for="item in searchData" :key="item._id" class="seaech-box">
      <div class="seaech-box-header">
        <Icon type="ios-podium" color="#19be6b" />
        <nuxt-link :to="`${item.author}/${item.path}`" class="search-link">
          <span>{{ item.author }}</span> /
          <span class="text-title">{{ item.title }}</span>
        </nuxt-link>
      </div>
      <div class="seaech-box-main">
        <div class="seaech-box-tip">文档描述</div>
        <div v-if="item.description">{{ item.description }}</div>
        <div v-else style="color:#808695">没有找到文档描述信息</div>
      </div>
      <div v-if="item.directory.length" class="seaech-box-directory">
        <div class="seaech-box-tip">文档目录</div>
        <Tag
          v-for="child in item.directory"
          :key="child._id"
          :color="child.type === 'note' ? 'blue' : 'green'"
          size="medium"
        >
          <div class="index-page-flex-middle seaech-box-directory-box">
            <img
              :src="require('@/assets/svg/' + child.type + '.svg')"
              class="seaech-box-directory-image"
            />
            <nuxt-link
              :to="`${item.author}/${item.path}/tree/${child._id}`"
              class="search-child-link"
            >
              {{ child.name }}
            </nuxt-link>
          </div>
        </Tag>
      </div>
      <div class="index-page-flex-middle seaech-box-floor">
        <Icon type="ios-star" />
        <span>{{ item.likeCount }}</span>
        <Icon type="md-time" />
        <span :title="$timeConversion(item.time)">{{ item.time | TimeFilter }}前更新</span>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.search-list-wrap {
  max-width: 800px;
}
.seaech-box {
  width: 100%;
  margin: 0 0 20px;
  border: 1px solid #dcdee2;
  border-radius: 8px;
}
.seaech-box-main,
.seaech-box-header,
.seaech-box-directory {
  padding: 10px 20px;
  border-bottom: 1px solid #dcdee2;
}
.seaech-box-tip {
  margin: 0 0 5px 0;
  font-size: 12px;
  font-weight: 600;
}
.search-link {
  font-size: 16px;
  margin: 0 0 0 5px;
}
.search-child-link {
  margin: 0 0 0 5px;
  color: inherit;
}
.search-link:hover,
.search-child-link:hover {
  text-decoration: underline;
}
.seaech-box-directory-image {
  width: 16px;
  height: 16px;
}
.seaech-box-floor{
  padding: 10px 20px;
}
.seaech-box-floor i{
  margin: 0 5px;
}
</style>
