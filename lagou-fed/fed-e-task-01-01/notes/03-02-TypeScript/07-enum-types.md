## 枚举类型
特点：给一组数值分别其名字；一个枚举中只会存在几个固定的值，不会有超出范围的可能

枚举类型会入侵到运行时的代码（会影响编译后的结果）；typescript使用的类型在编译后大多会被移除，枚举不会，它将编译为一个双向的键值对对象（可以通过键获取值也可以通过值获取键）

在javascript中使用字典的方式
```typescript
const postStatus = {
  Draft: 0,
  Unpublished: 1,
  Published: 2
}

const post = {
  title: 'Hello TypeScript',
  content: 'TypeScript is a typed superset of javascript',
  status: postStatus.Draft // 2 // 1 // 0 //文章状态
}
```
在typescript中可以使用枚举类型

枚举的值不必指定，默认将从0累加；如果给定值，后面的不给值，那将在给定值的基础上累加
```typescript
enum PostStatus {
  Draft,
  Unpublished,
  Published
}

const post = {
  title: 'Hello TypeScript',
  content: 'TypeScript is a typed superset of javascript',
  status: PostStatus.Draft // 2 // 1 // 0 //文章状态
}
```
如果给定的是字符，因为字符串枚举无法像数组那样自增，那么每一个都要给定初始明确的字符串
```typescript
enum PostStatus {
  Draft = '草稿',
  Unpublished = '未发布',
  Published = '发布'
}
```
可以根据值获取枚举的名称 PostStatus[6] // => Draft
