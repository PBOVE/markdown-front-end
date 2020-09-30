<template>
  <div class="custom-crad">
    <div class="index-page-flex-between">
      <div class="custom-crad-title index-text-hidden">{{ item.title }}</div>
      <Icon v-if="closeButton" type="md-close" class="custom-crad-close" @click.stop="handleCardDelete" />
    </div>
    <div>{{ item.description }}</div>
    <!-- <div class="custom-card-iamges">{{ item.author |filters }}</div> -->
    <!-- <img class="custom-card-iamges" :src="`/animal/${animal[setImageSrc()]}.png`" @mousedown.prevent /> -->
  </div>
</template>

<script>
import { animalName } from '@/utils/accountName';

export default {
  filters: {
    filters(title) {
      return title[0];
    }
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    index: {
      type: Number,
      default: -1
    },
    closeButton: {
      type: Boolean,
      default: true
    }
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
    }
  },
};
</script>

<style scoped>
.custom-crad {
  display: inline-block;
  position: relative;
  margin: 10px;
  padding: 15px;
  width: 236px;
  height: 108px;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  z-index: 0;
  background-image: linear-gradient(to bottom right, #2b85e4 20%, #2db7f5);
}
.custom-crad-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px 0;
}
.custom-card-iamges{
  position: absolute;
  right: 10px;
  top: 15px;
  z-index: -1;
  user-select: none;
}
.custom-crad-close{
  font-weight: bold;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s;
}
.custom-crad:hover .custom-crad-close{
  opacity: 1;
}
</style>
