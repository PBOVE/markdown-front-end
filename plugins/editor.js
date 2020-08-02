import Vue from 'vue';
/**
 * 引入 VMdEditor VMdPreview
 */
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
import dart from 'highlight.js/lib/languages/dart';
import vim from 'highlight.js/lib/languages/vim';
import sql from 'highlight.js/lib/languages/sql';
import go from 'highlight.js/lib/languages/go';



// emoji
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
    hljs.registerLanguage('dart', dart);
    hljs.registerLanguage('vm', vim);
    hljs.registerLanguage('sql', sql);
    hljs.registerLanguage('go', go);
  },
});

const tagList = [ 'input', 'style', 'script' ];

VMdEditor.xss.extend({
  // 扩展白名单
  onTag(tag, html, options) {
    if (tagList.includes(tag)) return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return html;
  },
});
VMdPreview.xss.extend({
  onTag(tag, html, options) {
    if (tagList.includes(tag)) return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return html;
  },
});
VMdPreview.use(githubTheme);
VMdPreview.use(createEmojiPlugin());

Vue.use(VMdEditor);
Vue.use(VMdPreview);
