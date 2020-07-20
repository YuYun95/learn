## 数组类型

方式一使用Array泛型，'<number>'表示元素类型
```typescript
const arr1: Array<number> = [1, 2, 3] // 表示纯数字数组
```
方式二使用元素类型和'[]'
```typescript
const arr2: number[] = [1, 2, 3]
```

```typescript
function sum (...args: number[]) {
  return args.reduce((prev, current) => prev + current)
}

sum(1, 2, 3)
```
