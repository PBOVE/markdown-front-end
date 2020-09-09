import Vue from 'vue';

/**
 * 引入 VMdEditor VMdPreview
 */
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';

import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

// 插件
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';

import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp.min.js';
import 'prismjs/components/prism-css.min.js';
import 'prismjs/components/prism-dart.min.js';
import 'prismjs/components/prism-docker.min.js';
import 'prismjs/components/prism-git.min.js';
import 'prismjs/components/prism-go.min.js';
import 'prismjs/components/prism-http.min.js';
import 'prismjs/components/prism-icon.min.js';
import 'prismjs/components/prism-java.min.js';
import 'prismjs/components/prism-jq.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-jsonp.min.js';
import 'prismjs/components/prism-kotlin.min.js';
import 'prismjs/components/prism-markdown.min.js';
import 'prismjs/components/prism-nginx.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-regex.min.js';
import 'prismjs/components/prism-sass.min.js';
import 'prismjs/components/prism-powershell.min.js';
import 'prismjs/components/prism-sql.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-vim.min.js';

VMdEditor.use(createEmojiPlugin());
VMdEditor.use(createKatexPlugin());
VMdEditor.use(createTodoListPlugin());

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
VMdPreview.use(createKatexPlugin());
VMdPreview.use(createTodoListPlugin());
VMdPreview.use(createCopyCodePlugin());

Vue.use(VMdEditor);
Vue.use(VMdPreview);
