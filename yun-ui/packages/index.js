// 整个包的入口
// 定义 install 方法，接收 Vue 作为参数，如果使用 use 注册插件，则所有的组件都将被注册

import YunButton from './button'
import YunDialog from './dialog'
import YunInput from './input'
import YunCheckbox from './checkbox'
import YunRadio from './radio'
import YunRadioGroup from './radio-group'
import YunSwitch from './switch'
import YunCheckboxGroup from './checkbox-group'
import YunForm from './form'
import YunFormItem from './form-item'
import './fonts/iconfont.css'

const components = [
  YunButton,
  YunDialog,
  YunInput,
  YunCheckbox,
  YunRadio,
  YunRadioGroup,
  YunSwitch,
  YunCheckboxGroup,
  YunForm,
  YunFormItem
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 遍历注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

// 判断是否直接引入文件(通过连接引入组件库)，如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  YunButton,
  YunDialog,
  YunInput,
  YunCheckboxGroup,
  YunCheckbox,
  YunRadioGroup,
  YunRadio,
  YunSwitch,
  YunForm,
  YunFormItem
}
