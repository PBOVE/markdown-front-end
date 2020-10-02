/**
*
*  @author ZTiger
*
*/

<template>
  <Poptip trigger="hover" placement="bottom-start" :width="width" :transfer="true">
    <slot />
    <div slot="title" class="index-page-flex-middle">
      <head-portrait-show
        :images="images"
        :name="nickName"
        :width="60"
        :height="60"
      />
      <div style="margin:5px 0px 0 15px;">
        <div style="font-size:16px;font-weight:bold; letter-spacing: 0.05em;">{{ nickName }}</div>
        <div style="font-size:16px;  letter-spacing: 0.05em;">{{ userName }}</div>
        <div style="color:#515a6e;">
          <Icon type="ios-pin-outline" />
          <span v-if="province">{{ province }} {{ city }}</span>
          <span v-else></span>
        </div>
      </div>
    </div>
    <div slot="content">
      <Icon type="ios-stats-outline" />
      <span>{{ signature }}</span>
    </div>
  </Poptip>
</template>

<script>
import headPortraitShow from '@/components/headPortrait/show.vue';

export default {
  components: { headPortraitShow },
  props: {
    images: {
      type: [String, undefined],
      default: '',
    },
    // eslint-disable-next-line vue/require-default-prop
    nickName: String,
    // eslint-disable-next-line vue/require-default-prop
    userName: String,
    // eslint-disable-next-line vue/require-default-prop
    signature: String,
    // eslint-disable-next-line vue/require-default-prop
    province: [String, undefined],
    // eslint-disable-next-line vue/require-default-prop
    city: [String, undefined],
  },
  data() {
    return {
      // 宽度
      width: 300,
    };
  },
  mounted() {
    if (window.innerWidth < 300) {
      this.width = window.innerWidth - 20;
    }
    if (window.innerWidth < 500) {
      this.setting = true;
    }
    window.addEventListener('resize', this.clientSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.clientSize);
  },
  methods: {
    clientSize() {
      if (window.innerWidth < 300) {
        this.width = window.innerWidth - 20;
      } else this.width = 300;
      if (window.innerWidth < 500) this.setting = true;
      else this.setting = false;
    },
  },
};
</script>

<style scoped>
</style>
