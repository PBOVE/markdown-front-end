/**
*
*  @author ZTiger
*
*/


<template>
  <div class="index-page-wrap">
    <div class="index-page-header">
    </div>
    <div class="index-page-content">
      <div
        class="index-page-row index-page-flex-between"
        v-for="(item,index) in likes.content"
        :key="item.path"
      >
        <div class="index-page-row-left">
          <div class="index-page-flex-middle index-page-row-start">
            <nuxt-link
              :to="'/'+user.userName+'/'+item.path"
              class="index-page-row-link"
            >{{item.title}}</nuxt-link>
            <div v-if="!item.share" class="index-page-row-share">{{item.share|shareFilter}}</div>
          </div>
          <div class="index-page-row-description">{{item.description}}</div>
          <div
            class="index-page-row-time"
            :title="timeConversion(item.updateTime)"
          >{{item.updateTime|timeFilter}}</div>
        </div>
        <div class="index-page-row-right">
          <div class="index-page-flex-middle index-page-row-star">
            <img
              v-if="item.islike"
              src="@/assets/images/star.png"
              class="index-page-row-star-image"
            />
            <img v-else src="@/assets/images/unstar.png" class="index-page-row-star-image" />
          </div>
        </div>
      </div>
    </div>
    <div class="index-page-footer index-page-flex-middle" v-if="likes.totalElements">
      <Page :total="likes.totalElements" size="small" :page-size="10" @on-change="pageChange" />
    </div>
  </div>
</template>


<script>
export default {
  props: ["likes", "user"],
  filters: {
    shareFilter(share) {
      return share ? "" : "私有项目";
    },
    timeFilter(time) {
      let dateStart = new Date(time);
      let dateEnd = new Date();
      let dateValue = dateEnd - dateStart;
      let DateValue = [1000, 60, 60, 24, 30, 12, Infinity];
      for (var i = 0; i < DateValue.length - 1; i++) {
        dateValue /= DateValue[i];
        if (dateValue < DateValue[i + 1]) {
          switch (i) {
            case 0:
              dateValue = parseInt(dateValue) + " 秒";
              break;
            case 1:
              dateValue = parseInt(dateValue) + " 分钟";
              break;
            case 2:
              dateValue = parseInt(dateValue) + " 小时";
              break;
            case 3:
              dateValue = parseInt(dateValue) + " 天";
              break;
            case 4:
              dateValue = parseInt(dateValue) + " 个月";
              break;
            case 5:
              dateValue = parseInt(dateValue) + " 年";
              break;
          }
          break;
        }
      }
      return dateValue + "前更新";
    },
  },
  data() {
    return {
      // 搜索
      search: "",
    };
  },
  methods: {
    // 时间转换
    timeConversion(time) {
      const date = new Date(time);
      const completion = num => {
        return num.toString().padStart(2, "0");
      };
      return `${date.getFullYear()}年${completion(
        date.getMonth() + 1,
      )}月${completion(date.getDate())}日 ${completion(
        date.getHours(),
      )}:${completion(date.getMinutes())}`;
    },
    // 页面改变
    pageChange() {},
  },
};
</script>

