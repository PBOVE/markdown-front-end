/**
*
*  @author ZTiger
*
*/

<template>
  <div class="tinymce-wrap">
    <client-only>
      <tinymce-vue v-model="handbook" :init="init" />
    </client-only>
  </div>
</template>

<script>
import { uploadFile } from '@/api/account';
import tinymceVue from '@tinymce/tinymce-vue';

if (process.client) {
  require('tinymce/tinymce');
  require('tinymce/themes/silver/theme');
  require('tinymce/themes/silver');
  require('tinymce/icons/default');
  require('tinymce/plugins/image'); // 插入上传图片插件
  require('tinymce/plugins/media'); // 插入视频插件
  require('tinymce/plugins/table'); // 插入表格插件
  require('tinymce/plugins/lists'); // 列表插件
  require('tinymce/plugins/link'); // 超链接插件
  require('tinymce/plugins/wordcount'); // 字数统计插件
  require('tinymce/plugins/emoticons'); // 插入表情插件
  require('tinymce/plugins/fullscreen');
  require('tinymce/plugins/code');
  require('tinymce/plugins/paste');
  require('tinymce/plugins/advlist');
  require('tinymce/plugins/autolink');
  require('tinymce/plugins/autosave');
  require('tinymce/plugins/colorpicker');
  require('tinymce/plugins/contextmenu');
  require('tinymce/plugins/directionality');
  require('tinymce/plugins/nonbreaking');
  require('tinymce/plugins/insertdatetime');
  require('tinymce/plugins/preview');
  require('tinymce/plugins/print');
  require('tinymce/plugins/save');
  require('tinymce/plugins/searchreplace');
  require('tinymce/plugins/spellchecker');
  require('tinymce/plugins/tabfocus');
  require('tinymce/plugins/table');
  require('tinymce/plugins/template');
  require('tinymce/plugins/textcolor');
  require('tinymce/plugins/visualblocks');
  require('tinymce/plugins/textpattern');
  require('tinymce/plugins/visualchars');
  require('tinymce/plugins/wordcount');
  require('tinymce/plugins/anchor');
  require('tinymce/plugins/hr');
  require('tinymce/plugins/link');
  require('tinymce/plugins/noneditable');
  require('tinymce/plugins/pagebreak');
  require('tinymce/plugins/charmap');
  require('tinymce/plugins/toc');
}

export default {
  components: { tinymceVue },

  data() {
    return {
      // 值
      handbook: '',
      // 初始化
      init: {
        height: '100%',
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        content_css: '/tinymce/skins/content/default/content.css',
        // 状态栏指的是编辑器最底下、左侧显示dom信息、右侧显示Tiny版权链接和调整大小的那一条
        statusbar: false,
        // 拼写检查
        browser_spellcheck: true,
        branding: false, // 去水印
        // 在编辑器中屏蔽浏览器本身的右键菜单
        contextmenu_never_use_native: true,
        // 为tinymce附加新图标集合
        icons: 'custom',
        // 附加新图标的url路径
        icons_url: '/tinymce/icon/icons.js',
        // 移动端
        mobile: {
          menubar: true,
          plugins: [
            'lists advlist insertdatetime table image paste wordcount hr print charmap save code media pagebreak searchreplace  fullscreen link preview toc',
          ],
          // 当tinymce检测到当前环境为移动设备时，该参数允许你配置在移动设备生效配置参数。
          toolbar: 'save | undo redo | bold italic forecolor backcolor ',
        },
        // 图片上传
        images_upload_handler: this.imagesUpload,
        // 插件
        plugins: [
          'lists advlist insertdatetime table image paste wordcount hr print charmap save code media pagebreak searchreplace  fullscreen link preview toc',
        ],
        toolbar:
          'save |undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |  blockquote | removeformat ',
        // 保存
        save_onsavecallback: this.contentSave,
        // 当内容无变化时禁用保存按钮
        save_enablewhendirty: false,
        readonly: false,
      },
    };
  },
  methods: {
    // 图片上传
    async imagesUpload(blobInfo, success, failure) {
      const file = blobInfo.blob();
      const Filedata = new FormData();
      Filedata.append('file', file);
      try {
        const { data } = await uploadFile(Filedata);
        success(`/api/storage/preview/${data[0]}`);
      } catch (err) {
        failure(err);
      }
    },
    // 保存
    contentSave() {
      this.$emit('on-save', this.handbook);
    },
    // 设置内容
    setUserByInput(value) {
      this.handbook = value;
    },
  },
};
</script>

<style scoped>
.tinymce-wrap {
  height: 100%;
}
</style>
<style>
.tinymce {
  font-size: 14px !important;
}
.tinymce-wrap .tox-menubar {
  height: 41px;
  background: #ffffff !important;
}
.tox-fullscreen .tox.tox-tinymce.tox-fullscreen{
  z-index: 1010!important;
}

</style>
