// 导入组件，组件必须声明 name
import YunButton from './src/button'

YunButton.install = function (Vue) {
  // 为组件提供 install 安装方法，供按需引入
  Vue.component(YunButton.name, YunButton)
}

export default YunButton
