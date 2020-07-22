const marked = require('marked')

module.exports = source => { // source接受输入
    // console.log(source);
    // return 'hello';

    // 方法一
    const html = marked(source)
    // return `module.exports = ${JSON.stringify(html)}`

    // 方法二 返回 html 字符串交给下一个 loader处理 (html-loader)
    return html
}