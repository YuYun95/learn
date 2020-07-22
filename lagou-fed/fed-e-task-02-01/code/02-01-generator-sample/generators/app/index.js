// 此文件为 Generator 的核心入口
// 需要导出一个继承自 Yeoman Generator 的类
// Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
// 我们在这些生命周期方法中通过调用父类提供的一些工具方法实现一些功能，例如文件写入

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    // Yeoman 在询问用户环节会自动调用此方法
    // 在此方法中可以调用父类的 prompt() 方法发出对用户的命令行询问

    // 数组的每个元素都是一个问题（终端命令行交互）
    return this.prompt([
      {
        type: 'input', // input:使用用户输入的方式
        name: 'name', // 最终得到结果的键（用户输入的值的键）
        message: 'Your project name', // 终端界面给用户的提示（问题）
        default: this.appname // 默认值，如果用户不输入则使用默认值，appname 为项目生成目录名称
      }
    ]).then(answers => {// 用户交互选择的结果
      // answers => { name: 'user input value' }
      this.answers = answers
    })
  }

  writing() {
    // Yeoman 自动在生成文件阶段调用此方法
    // 我们尝试往项目目录中写入文件
    // this.fs.write(this.destinationPath('temp.txt'),Math.random().toString())

    // 通过模板方式写入文件到目标目录

    // 模板文件路径
    // const tmpl = this.templatePath('foo.txt')
    // // 输出目标路径
    // const outPut = this.destinationPath('foo.txt')
    // // 模板数据上下文
    // const context = { title: 'Hello zyh~', success: false }
    // this.fs.copyTpl(tmpl, outPut, context)

    // 模板文件路径
    const tmp = this.templatePath('bar.html')
    //输出模板路径
    const outPut = this.destinationPath('bar.html')
    // 模板数据上下文
    const context = this.answers
    this.fs.copyTpl(tmp, outPut, context)
  }
}
