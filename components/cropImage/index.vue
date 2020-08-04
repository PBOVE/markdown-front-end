/**
*
*  @author ZTiger
*
*/

<template>
  <div ref="cropWrap" class="crop-image-wrap">
    <client-only>
      <vue-cropper
        ref="cropper"
        :img="option.img"
        :can-scale="option.canScale"
        :output-size="option.size"
        :output-type="option.outputType"
        :info="true"
        :full="option.full"
        :can-move="option.canMove"
        :can-move-box="option.canMoveBox"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight"
        :fixed="option.fixed"
        :fixed-number="option.fixedNumber"
        :center-box="option.centerBox"
        :info-true="option.infoTrue"
        :fixed-box="option.fixedBox"
        :mode="option.mode"
        @realTime="realTime"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    imgSrc: {
      type: String,
    },
    // eslint-disable-next-line vue/require-default-prop
    cropHeight: {
      type: Number,
    },
    // eslint-disable-next-line vue/require-default-prop
    cropWidth: {
      type: Number,
    },
  },
  data() {
    return {
      cropper: '',
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: this.cropWidth, // 默认生成截图框宽度
        autoCropHeight: this.cropHeight, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        canMove: false, // 上传图片是否可以移动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: 'cover', // cover  图片铺满容器
      },
    };
  },
  watch: {
    imgSrc() {
      this.initCropper();
    },
  },
  methods: {
    // 初始化
    initCropper() {
      const img = new Image();
      img.src = this.imgSrc;
      img.onload = () => {
        this.option.img = this.imgSrc;
      };
    },
    // 预览
    realTime(data) {
      this.$emit('on-callback', data);
    },
    // 上传获取照片位置
    onCubeImg() {
      return new Promise((resolve) => {
        this.$refs.cropper.getCropBlob((data) => {
          resolve(data);
        });
      });
    },
  },
};
</script>

<style scoped>
.crop-image-wrap {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
