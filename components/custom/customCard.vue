<template>
  <div class="custom-crad">
    <div class="custom-crad-title index-text-hidden">{{ title }}</div>
    <div>{{ description }}</div>
    <!-- <div class="custom-crad-selcet">
      <Icon type="md-checkmark" size="18" color="#fff" />
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    likeCount: {
      type: Number,
      default: 0,
    },
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
  color: #000000;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  z-index: 0;
}
.custom-crad-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px 0;
}
.custom-crad-selcet::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  left: -18px;
  top: -18px;
  border-right: 20px solid #2b85e4;
  border-left: 20px solid transparent;
  border-top: 20px solid transparent;
  border-bottom: 20px solid #2b85e4;
  z-index: -1;
}
.custom-crad-selcet {
  position: absolute;
  bottom: 0px;
  right: 3px;
}

.custom-crad-background{
  background-image: url("../../assets/images/300.png");
  background-size: 100%;
      box-shadow: 0 0 0 rgba(0,0,0,0.15);
    transition: box-shadow 0.218s ease;
}
</style>
