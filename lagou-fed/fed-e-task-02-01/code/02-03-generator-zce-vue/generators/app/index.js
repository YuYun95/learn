const Generator = require('yeoman-generator')

module.exports = class extends Generator{
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      }
    ]).then(answers => {
      this.answers = answers
    })
  }
  writing() {
    // 把每一个文件都通过模板转换到目标路径

    const templates = [
      '.browserslistrc',
      '.editorconfig',
      '.env.development',
      '.env.production',
      '.eslintrc.js',
      '.gitignore',
      'babel.config.js',
      'package.json',
      'postcss.config.js',
      'README.md',
      'public/favicon.ico',
      'public/index.html',
      'src/App.vue',
      'src/main.js',
      'src/router.js',
      'src/assets/logo.png',
      'src/components/HelloWorld.vue',
      'src/store/actions.js',
      'src/store/getters.js',
      'src/store/index.js',
      'src/store/mutations.js',
      'src/store/state.js',
      'src/utils/request.js',
      'src/views/About.vue',
      'src/views/Home.vue'
    ]
    templates.forEach(item => {
      this.fs.copyTpl(this.templatePath(item), this.destinationPath(this.answers.name + '/' + item), this.answers)
    })
  }
  
  // cd到项目然后安装依赖
  install () {
    var npmdir = process.cwd() + '/' + this.answers.name
    process.chdir(npmdir)
    this.installDependencies({
      bower: false,
      npm: true
    })
  }
}
