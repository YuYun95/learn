## interface 接口
接口就是约束对象的结构，一个对象去实现一个结构，它就必须要拥有这个接口当中所约束的所有成员

可以理解为一种规范、契约，可以用来约定对象的结果

约定对象上有哪些成员，成员是什么类型

```typescript
interface Post {
  title: string
  content: string
}

// 传入的参数必须包含title和content
function printPost (post: Post) {
  console.log(post.title)
  console.log(post.content)
}

printPost({
  title:'Hello TypeScript',
  content: 'A javascript superset'
})
```
