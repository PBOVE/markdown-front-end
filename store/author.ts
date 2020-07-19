export const namespaced = true;

export const state = () => ({
  // 用户信息,点赞数量
  author: {},
  // 知识库信息
  project: {},
});

export const mutations = {
  setAuthor(state: any, data: any) {
    state.author = data;
  },
  setProject(state: any, data: any) {
    state.project = data;
  },
};
export const getters = {
  storeAuthorUser(state: any) {
    return state.author;
  },
  storeAuthorNumber(state: any) {
    return state.author;
  },
  storeAuthorLocaltion(state: any) {
    return state.author.location;
  },
  storeProject(state: any) {
    return state.project;
  },
  storeEdit(state: any) {
    return state.project.edit;
  },
  storeFormat(state: any) {
    return state.project.format;
  },
  storeContent(state: any) {
    if (state.project.format === 'markdown')
      return (
        state.project.content ||
        '###标题\n> Markdown 标题有两种格式\n+ 使用 = 和 - 标记一级和二级标题\n> = 和 - 标记语法格式如下\n```md\n我展示的是一级标题\n=================\n我展示的是二级标题\n-----------------\n```\n+  使用 # 号标记\n> 使用 # 号可表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推\n```md\n# 一级标题\n## 二级标题\n### 三级标题\n#### 四级标题\n##### 五级标题\n###### 六级标题\n```\n## 段落\n> Markdown 段落没有特殊的格式，直接编写文字就好，段落的换行是使用两个以上空格加上回车。\n## 字体\n\n> Markdown 可以使用以下几种字体\n```md\n*斜体文本*\n_斜体文本_\n**粗体文本**\n__粗体文本__\n***粗斜体文本***\n___粗斜体文本___\n```\n## 列表\n> Markdown 支持有序列表和无序列表。无序列表使用星号(*)、加号(+)或是减号(-)作为列表标记，这些标记后面要添加一个空格，然后再填写内容```md\n* 第一项\n* 第二项\n* 第三项\n\n+ 第一项\n+ 第二项\n+ 第三项\n\n- 第一项\n- 第二项\n- 第三项\n```\n## 区块\n>Markdown 区块引用是在段落开头使用 > 符号 ，然后后面紧跟一个空格符号：\n## 代码\n>如果是段落上的一个函数或片段的代码可以用反引号把它包起来（`），例如：\n```md\n`printf()` 函数\n```\n## 代码区块\n> 代码区块使用 4 个空格或者一个制表符（Tab 键）。\n```json\n{\n "key": "value"\n}\n```\n##  链接\n```md\n[链接名称](链接地址)\n\n或者\n\n<链接地址>\n```\n## 图片\n```md\n![alt 属性文本](图片地址)\n\n![alt 属性文本](图片地址 "可选标题")\n```\n## 表格\n> Markdown 制作表格使用 | 来分隔不同的单元格，使用 - 来分隔表头和其他行。\n```md\n|  表头   | 表头  |\n|  ----  | ----  |\n| 单元格  | 单元格 |\n| 单元格  | 单元格 |\n```\n### 对齐方式\n> 我们可以设置表格的对齐方式：\n+  -: 设内容和标题栏居右对齐。\n+ :- 设置内容和标题栏居左对齐。\n+ :-: 设置内容和标题栏居中对齐。\n\n```md\n| 左对齐 | 右对齐 | 居中对齐 |\n| :-----| ----: | :----: |\n| 单元格 | 单元格 | 单元格 |\n| 单元格 | 单元格 | 单元格 |\n```\n## 高级技巧\n> 目前支持的 HTML 元素有：`<kbd> <b> <i> <em> <sup> <sub> <br>`等 ，如：\n### 转义\nMarkdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：\n```md\n**文本加粗** \n** 正常显示星号 **\n   反斜线\n`   反引号\n*   星号\n_   下划线\n{}  花括号\n[]  方括号\n()  小括号\n#   井字号\n+   加号\n-   减号\n.   英文句点\n!   感叹号\n```'
      );
    return state.project.content;
  },
};
