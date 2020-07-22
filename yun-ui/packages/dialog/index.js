import YunDialog from './src/dialog'

YunDialog.install = function (Vue) {
  Vue.component(YunDialog.name, YunDialog)
}

export default YunDialog
