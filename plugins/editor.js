import Vue from 'vue';
/**
 * 引入 VMdEditor VMdPreview
 */
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

// emoji
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';

VMdEditor.use(createEmojiPlugin());
VMdEditor.use(vuepressTheme);

const tagList = [ 'input', 'style', 'script' ];

VMdEditor.xss.extend({
  // 扩展白名单
  onTag(tag, html) {
    if (tagList.includes(tag)) return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return html;
  },
});
VMdPreview.xss.extend({
  onTag(tag, html) {
    if (tagList.includes(tag)) return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return html;
  },
});
VMdPreview.use(vuepressTheme);
VMdPreview.use(createEmojiPlugin());

Vue.use(VMdEditor);
Vue.use(VMdPreview);
