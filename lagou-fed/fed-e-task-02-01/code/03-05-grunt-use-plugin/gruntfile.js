module.exports = grunt => {
    grunt.initConfig({
        clean: {
            // temp:'temp/app.js' // 需要清除的文件，可以使用通配符"*"，“**”表示找到该目录下的文件以及子目录的文件（即该目录下的所有文件）
            temp: 'temp/*.txt'
        }
    })

    // 通过 loadNpmTasks 加载插件中提供的任务
    grunt.loadNpmTasks('grunt-contrib-clean')
}

// 通过 npm 安装
// 在 gruntfile.js 文件中通过 grunt.loadNpmTasks() 方法把插件中提供的任务加载进来
// 在 grunt.initConfig() 方法中为任务添加配置选项