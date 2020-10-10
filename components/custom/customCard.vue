<template>
  <div class="custom-crad-wrap">
    <div class="custom-crad">
      <div class="index-page-flex-between custom-crad-header">
        <div class="index-page-flex-middle">
          <Icon type="ios-podium" color="#19be6b" style="margin: 0 10px 0 0" />
          <nuxt-link v-if="routerLink" :to="`${item.author}/${item.path}`" class="custom-crad-link">
            <span>{{ item.author }}</span> /
            <span class="text-title">{{ item.title }}</span>
          </nuxt-link>
          <span v-else class="header-text">
            <span class="text-title">{{ item.title }}</span>
          </span>
        </div>
        <Icon
          v-if="closeButton"
          type="md-close"
          class="custom-crad-close"
          @click="handleCardDelete"
        />
      </div>
      <div class="text-description">
        {{ item.description | descriptionSubstr }}
      </div>
      <div class="index-page-flex-middle">
        <Icon type="md-star-outline" size="16" />
        <span style="margin: 0 5px">{{ item.likeCount }}</span>
        <Icon v-if="item.share" type="ios-unlock-outline" size="16" />
        <Icon v-else type="ios-lock-outline" size="16" />
      </div>
    </div>
  </div>
</template>

<script>
import { animalName } from '@/utils/accountName';

export default {
  filters: {
    descriptionSubstr(title) {
      if (title.length < 60) {
        return title;
      }
      return title.substr(0, 50) + '...';
    },
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default: -1,
    },
    closeButton: {
      type: Boolean,
      default: true,
    },
    routerLink: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      word: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-',
      // 动物列表
      animal: animalName,
    };
  },
  methods: {
    // 设置照片路径
    setImageSrc() {
      let num = 0;
      for (let i = 0; i < this.item.path.length; i++) {
        num += this.word.indexOf(this.item.path[i].toUpperCase());
      }
      return num % this.animal.length;
    },
    // 点击 Card 删除
    handleCardDelete() {
      this.$emit('on-delete', this.item, this.index);
    },
  },
};
</script>

<style scoped>
.custom-crad-wrap {
  display: inline-block;
  padding: 10px;
  margin: 10px;
  width: 236px;
  height: 108px;
  background: #fff;
  border: 1px solid #e1e4e8;
  color: #000;
  border-radius: 8px;
}
.custom-crad {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.header-text {
  color: #2d8cf0;
}
.text-title {
  color: #2b85e4;
}
.text-author {
  color: #2d8cf0;
}
.custom-crad-close {
  font-weight: bold;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
}
.custom-crad:hover .custom-crad-close {
  opacity: 1;
}
.text-description {
  flex: 1;
  font-size: 12px;
  color: #586069;

  word-break: break-all;
}
.custom-crad-link:hover {
  text-decoration: underline;
}
</style>
