## TypeScript快速上手
安装typescript

使用yarn/npm tsc 文件名，这样就可以编辑文件，编辑过程会检查类型和移除注解之类扩展语法，还会自动转换ES新特性

typescript可以完全按照javascript标准语法编写代码

```javascript
const hello = (name: string) => {
    console.log(`Hello ${name}`)
}

// hello(100) // 报错
hello('typescript')
```