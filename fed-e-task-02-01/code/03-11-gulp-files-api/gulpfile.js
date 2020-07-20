const { src, dest } = require('gulp')
const cleanCss = require('gulp-clean-css') // 压缩代码转换流模块
const rename = require('gulp-rename') // 重命名扩展名

exports.default = () => {
    // gulp读取流 和 写入流，可以使用统配符
    return src('src/*.css')
        .pipe(cleanCss())
        .pipe(rename({ extname: '.min.css' })) // 指定重命名的扩展名
        .pipe(dest('dist'))
}
