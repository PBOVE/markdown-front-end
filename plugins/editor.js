import Vue from 'vue';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// 高亮
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import nginx from 'highlight.js/lib/languages/nginx';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import markdown from 'highlight.js/lib/languages/markdown';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';

VMdEditor.use(createEmojiPlugin());
VMdEditor.use(githubTheme, {
  extend(md, hljs) {
    hljs.registerLanguage('ts', typescript);
    hljs.registerLanguage('py', python);
    hljs.registerLanguage('php', php);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('nginx', nginx);
    hljs.registerLanguage('cpp', cpp);
    hljs.registerLanguage('c', cpp);
    hljs.registerLanguage('md', markdown);
  },
});
VMdPreview.use(githubTheme);
VMdPreview.use(createEmojiPlugin());

Vue.use(VMdEditor);
Vue.use(VMdPreview);
