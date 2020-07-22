// 接口
export {} // 确保跟其他示例没有成员冲突


// 接口就是约束对象的结构，一个对象去实现一个结构，它就必须要拥有这个接口当中所约束的所有成员

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
