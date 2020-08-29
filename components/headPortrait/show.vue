 <!-- eslint-disable vue/no-v-html -->
<template>
  <div class="show-wrap">
    <img
      v-if="images"
      class="show-img"
      :class="{'main-user-rotate-image': select}"
      :src="'/api/storage/preview/' + images"
      :style="{width:width + 5 +'px',height:height + 5 +'px'}"
    />
    <div
      v-else
      class="avatars-svg"
      :style="{width:width+'px',height:height+'px'}"
      v-html="setAvatars"
    />
  </div>
</template>

<script>
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-identicon-sprites';

export default {
  props: {
    images: { type: String, default: '' },
    name: { type: String, default: '' },
    width: { type: Number, default: 30 },
    height: { type: Number, default: 30 },
    select: { type: Boolean, default: false },
  },
  deta() {
    return {};
  },
  computed: {
    setAvatars() {
      const avatars = new Avatars(sprites, { base64: false });
      return avatars.create(this.name);
    },
  },
};
</script>

<style>
.show-wrap {
  font-size: 0;
}
.avatars-svg {
  cursor: pointer;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}
.show-img {
  border-radius: 50%;
  cursor: pointer;
}
</style>
