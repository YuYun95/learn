# Vue.js 3.0 Composition APIs 及 3.0 原理剖析
## Vue.js 3.0介绍
### 一、Vue.js 源码组织方式
1. 源码采用 Typescript 重写

   提高了代码的可维护性。大型项目的开发都推荐使用类型化的语言，在编码的过程中检查类型的问题

2. 使用 Monorepo 管理项目结构
   
   使用一个项目管理多个包，把不同功能的代码放到不同的package中管理，这样每个功能模块划分明确，模块之间的依赖关系也明确，每个功能模块都可以单独测试、单独发布、单独使用

3. 不同的构建版本
   
   Vue3不再构建UMD模块化的方式，因为UMD会让代码有更多的冗余，它要支持多种模块化的方式。Vue3中将CJS、ESModule和自执行函数的方式分别打包到了不同的文件中。在package/vue中有Vue3的不同构建版本
   * cjs(commonjs模块化方式，两个都是完整版，包含运行时和编译器)
       * vue.cjs.js 开发版，代码没有被压缩
       * vue.cjs.prod.js 生产版，代码被压缩过
   * global 四个文件在浏览器中都可以通过script标签导入，导入后去增加一个全局的Vue对象
       * vue.global.js 完整版，包含编译器和运行时
       * vue.global.prod.js 完整版，生产版代码压缩，包含编译器和运行时
       * vue.runtime.global.js 只包含运行时的构建版本
       * vue.runtime.global.prod.js 只包含运行时的构建版本
   * browser 四个版本都包含esm，浏览器的原生模块化方式，可以直接通过<script type="module" />的方式来导入模块
       * vue.esm-browser.js
       * vue.esm-browser.prod.js
       * vue.runtime.esm-browser.js
       * vue.runtime.esm-browser.prod.js
   * bundler 这两个版本没有打包所有的代码，只会打包使用的代码，需要配合打包工具来使用，会让Vue体积更小
       * vue.esm-bundler.js
       * vue.runtime.esm-bundler.js

### 二、Composition API
* RFC(Request For Comments)
   * https://github.com/vuejs/rfcs
* Composition API RFC
   * https://composition-api.vuejs.org
