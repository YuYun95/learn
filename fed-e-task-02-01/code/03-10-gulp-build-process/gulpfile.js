const fs = require('fs')
const { Transform } = require('stream')

exports.default = () => {
    // 文件读取流
    const read = fs.createReadStream('normalize.css')
    // 文件写入流
    const write = fs.createWriteStream('normalize.min.css')
    // 文件转换流
    const transform = new Transform({
        transform: (chunk, encoding, callback) => {
            // 核心转换过程
            // chunk => 读取流中读取到的内容（Buffer）
            const input = chunk.toString()
            // 替换空格、注释（压缩代码）
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            // 把内容传出
            callback(null, output) // 错误优先的回调函数
        }
    })

    // 把读取出来的文件流导入写入文件流
    read
        .pipe(transform) // 转换
        .pipe(write) // 写入
    return read
}

// 工作过程：输入(读取流) => 加工(转换流) => 输出(写入流)