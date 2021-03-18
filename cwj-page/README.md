### 黑盒webpack配置
如果有多个项目使用了相同的配置，如果以后webpack配置更能了，需要一个个项目修改，这么比较麻烦。

可以通过包装webpack配置发布到npm，项目中安装配置，以后webpack配置修改了，只需要更新npm包即可

注意：webpack必须用 npm install webpack -S 下载，因为他是黑盒所依赖的模块，目的就是要对webpack进行包装

### 使用
1. 把配置发布到npm，项目中安装配置

2. 本地中可以把包装后的webpack配置，使用 npm link 本地软连接，项目中使用 npm link xxx 把配置安装进项目

然后在package.json 的 scripts 添加脚本，然后执行 npm run build 就可以打包项目了
```js
"scripts": {
  "build": 'xxxx'
}
```