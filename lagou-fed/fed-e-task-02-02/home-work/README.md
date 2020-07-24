# 一、简答题
## 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
* 构建流程主要环节
    * 设置打包入口（entry）
    * 设置打包出口（output）
    * 使用loader将文件转换为webpack能够处理的模块
    * 引入打包需要的插件

* Webpack 打包的整个过程
    * Webpack在启动后，会从Entry开始，递归解析Entry依赖的所有Module
    * 每找到一个Module，就会根据Module.rules里配置的Loader规则进行相应的转换处理
    * 对Module进行转换后，再解析出当前Module依赖的Module，这些Module会以Entry为单位进行分组，即为一个Chunk
    * 因此一个Chunk，就是一个Entry及其所有依赖的Module合并的结果
    * 最后Webpack会将所有的Chunk转换成文件输出Output
    * 在整个构建流程中，Webpack会在恰当的时机执行Plugin里定义的逻辑，从而完成Plugin插件的优化任务

## 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
* loader：
    * 用于对模块的源代码进行转换
    * loader描述了webpack如何处理非javascript模块，并且在build中引入这些依赖
    * loader可以将文件从不同的语言转为javascript，或者转为Data URL
    * webpack内容默认只会处理javascript文件，处理其他类型的文件要安装使用对应的loader，借助不同的loader就可以加载任何类型的资源
    * loader模块导出一个函数；该函数输入的是加载到的资源文件内容；函数体是处理内容的过程；输出的是经过处理过的资源文件内容结果，结果必须是javascript代码
* plugin
    * 用来扩展webpack功能，使用plugin可以解决loader无法实现的其他功能
    * plugin通过钩子机制实现，plugin必须是一个函数或者是一个包含apply方法的对象，通过在生命周期的钩子中挂载函数实现扩展


# 二、编程题
## 1、使用 Webpack 实现 Vue 项目打包任务
* 项目文件路径：code/vue-app-base
* 实现功能
    * 使用相应的loader转换css、js、vue、less、字体、图片等文件
    * 使用eslint、stylelint规范js和css代码
    * 使用resolve.alias配置别名
    * 使用webpack.DefinePlugin注入全局成员
    * 使用webpack.ProvidePlugin全局引入第三方库，不需要每个文件import
    * 使用插件优化打包结果
    * eslint和git hooks，提交代码前自动对代码格式检查，并格式化js、css代码风格
    * 使用commit lint规范commit message
