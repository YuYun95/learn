// 实现这个项目的构建任务
const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')

// 自动加载所有的插件
const plugins = loadPlugins() // 把‘gulp-’去掉，如果后面有多个‘-’会变为驼峰命名

// 创建服务器
const bs = browserSync.create()

const data = {
    menus: [
        {
            name: 'Home',
            icon: 'aperture',
            link: 'index.html'
        },
        {
            name: 'Features',
            link: 'features.html'
        },
        {
            name: 'About',
            link: 'about.html'
        },
        {
            name: 'Contact',
            link: '#',
            children: [
                {
                    name: 'Twitter',
                    link: 'https://twitter.com/w_zce'
                },
                {
                    name: 'About',
                    link: 'https://weibo.com/zceme'
                },
                {
                    name: 'divider'
                },
                {
                    name: 'About',
                    link: 'https://github.com/zce'
                }
            ]
        }
    ],
    pkg: require('./package.json'),
    date: new Date()
}

// 删除文件目录
const clean = () => {
    return del(['dist', 'temp'])
}

const style = () => {
    // base 基准路径，会把src后面的路径保留下来，否则不会按照原本路径输出
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(plugins.sass({ outputStyle: 'expanded' })) // outputStyle编译后“}”位于后面
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true })) // 把信息以流的方法推到浏览器
}

const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

const page = () => {
    // 如果存在子目录：'src/**/*.html'
    return src('src/*.html', { base: 'src' })
        // data 把数据传入到模板中，渲染对应的数据
        // cache 防止模板缓存导致页面不能及时更新
        .pipe(plugins.swig({ data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

// 压缩图片
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

// 压缩字体
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

// 转换其他文件
const extra = () => { // 转换其他文件
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
}

// 服务任务
// 此时dist文件目录的样式指向node_modules，需要修改配置
const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)

    // 开发阶段对图片、字体不构建，提高构建效率
    // watch('src/assets/images/**', image)
    // watch('src/assets/fonts/**', font)
    // watch('public/**', extra)

    // 文件变化后自动更新浏览器，浏览器重新发起请求
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ], bs.reload)

    bs.init({
        notify: false, // 关闭notify提示
        port: 8080, // 端口
        // open: false, // 是否自动打开浏览器
        files: 'dist/**', // browserSync服务监听的路径通配符，文件发生改变自动刷新浏览器
        server: {
            baseDir: ['temp', 'src', 'public'], // 如果资源在dist找不到就到src找，还找不到就到public找
            routes: { // 优先于baseDir，请求发生后会先看routes是否有对应的配置，如果有就走routes配置，否则就走baseDir对应的文件
                '/node_modules': 'node_modules' // 键是请求的前缀
            }
        }
    })
}

const useref = () => {
    return src('temp/*.html', { base: 'temp' })
        // 去除HTML文件构建注释、把构建注释的内容合并到一个文件中
        .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
        .pipe(plugins.if(/\.js$/, plugins.uglify())) // 压缩js
        .pipe(plugins.if(/\.css$/, plugins.cleanCss())) // 压缩css
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true, // 把html文件中的style压缩
            minifyJS: true // 把script中的js压缩
        }))) // 压缩html
        .pipe(dest('dist')) // 写入到另外一个文件，防止读、写同一个文件引发错乱
}

// 并行执行任务
const compile = parallel(style, script, page)

// 串行执行任务，上线前执行的任务
const build = series(
    clean,
    parallel(
        series(
            compile,
            useref
        ),
        image,
        font,
        extra
    )
)

const develop = series(compile, serve)

module.exports = {
    clean,
    compile,
    build,
    develop,
    useref
}
