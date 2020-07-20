/**
 * 函数类型
 * 
 * @flow
 */

// 表示回调函数参数类型分别为string和number没有返回值
function foo(callback: (string, number) => void) {
    callback('string', 100)
}

foo(function (str, n){
    // 不可以有返回值
})