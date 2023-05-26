# :rainbow: vitepress-markdown-timeline [![npm](https://img.shields.io/npm/v/vitepress-markdown-timeline.svg)](https://www.npmjs.com/package/vitepress-markdown-timeline) [![build status](https://github.com/vuejs/core/actions/workflows/ci.yml/badge.svg)](https://github.com/HanochMa/vitepress-markdown-timeline/blob/main/.travis.yml)

提供 markdown **时间线语法**，在 vitepress 中使用 markdown 渲染时间线（时间轴）样式。

![image-20230525102713136](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/vitepress-markdown-timeline-example.png)

## 安装

```shell
# NPM
$ npm install vitepress-markdown-timeline

# Yarn
$ yarn add vitepress-markdown-timeline

# pnpm
$ pnpm install vitepress-markdown-timeline
```

## 引入

在`.vitepress/config.ts`中先注册 markdown 解析插件

```ts
// .vitepress/config.ts or .vitepress/config.js
import timeline from "vitepress-markdown-timeline";
export default {
  // ...
  markdown: {
    // ...
    config: (md) => {
      md.use(timeline);
    },
  },
};
```

在`.vitepress/theme/index.ts`中引入时间线样式

```ts
// .vitepress/theme/index.ts or .vitepress/theme/index.js
import Theme from "vitepress/theme";
import "./styles/vars.scss";
import "./styles/style.scss";

// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";

export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx);
  },
};
```

## 使用

在 markdown 文件中以`::: timeline 时间`开头，`:::`结尾，中间插入内容即可（内容中可使用任何markdown语法）

输入

```js
::: timeline 2023-05-24
- **do some thing1**
- do some thing2
:::

::: timeline 2023-05-23
do some thing3
do some thing4
:::
```

渲染以下结果

![image-20230525103438927](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/vitepress-markdown-timeline-example2.png)

## Demo

[在线 demo](https://hanochma.github.io/daily/2023-04)

## Q&A

### 如何设置时间线圆点颜色？

找到`.vitepress\theme\styles\vars.scss`文件

```css
:root {
  //...
  --vp-c-brand: #b575e3; // 修改vitepress提供的主题颜色变量即可
}
```

### 引入样式文件`vitepress-markdown-timeline/dist/theme/index.css`报错，提示不存在？
升级至`1.2.0`或以上版本