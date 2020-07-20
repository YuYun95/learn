## Mixed 与 Any
区别

any：弱类型

mixed：强类型

```
// Mixed：接收任意类型的值，string|number|boolean|...

function passMixed(value: mixed) {

    // 内部不明确为字符串，不能当字符串使用；数字也一样

    if (typeof value === 'string') {
        value.substr(1)
    }
    
    if (typeof value === 'number') {
        value * value
    }
}

passMixed('string')
passMixed(100)

// Any：主要兼容老代码
function passAny(value: any) {
    value.substr(1)
    value * value
}
passAny('string')
passAny(100)
```