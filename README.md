# vitepress-markdown-timeline

在 vitepress 中用 markdown 渲染时间线样式

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

先注册`vitepress-markdown-timeline`提供的 markdown 解析插件

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
import Theme from 'vitepress/theme'
import './styles/vars.scss'
import './styles/style.scss'
// 添加下面这行代码，引入时间线样式
import 'vitepress-markdown-timeline/dist/theme.css' 
export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx)
  }
}
```

## 使用
在markdown文件中以`::: timeline 时间`开头，`:::`结尾，中间插入内容即可

输入

```js
::: timeline 2023-05-24
// do some thing1
// do some thing2
:::

::: timeline 2023-05-23
// do some thing3
// do some thing4
:::
```
渲染以下结果

![image-20230524161630659](https://raw.githubusercontent.com/HanochMa/PictureBed/main/blogs/vitepress-markdown-timeline1.png)

## Demo

[在线demo](https://hanochma.github.io/daily/2023-04)

## Q&A

### 如何设置时间线圆点颜色？

找到`.vitepress\theme\styles\vars.scss`文件

```css
:root {
  --vp-c-brand: #b575e3; // 修改这个即可
  //...
}
```



