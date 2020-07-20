// 枚举类型 enum
export {} // 确保跟其他示例没有成员冲突

//  特点：给一组数值分别其名字；一个枚举中只会存在几个固定的值，不会有超出范围的可能

// const postStatus = {
//   Draft: 0,
//   Unpublished: 1,
//   Published: 2
// }
//
// const post = {
//   title: 'Hello TypeScript',
//   content: 'TypeScript is a typed superset of javascript',
//   status: postStatus.Draft // 2 // 1 // 0 //文章状态
// }


// 枚举的值不必指定，默认将从0累加；如果给定值，后面的不给值，那将在给定值的基础上累加
// 如果给定的是字符，因为字符串枚举无法像数组那样自增，那么每一个都要给定初始明确的字符串
// 可以根据值获取枚举的名称 PostStatus[6] // => Draft
// enum PostStatus {
//   Draft = 6,
//   Unpublished,
//   Published
// }
enum PostStatus {
  Draft = '草稿',
  Unpublished = '未发布',
  Published = '发布'
}

const post = {
  title: 'Hello TypeScript',
  content: 'TypeScript is a typed superset of javascript',
  status: PostStatus.Draft // 2 // 1 // 0 //文章状态
}


// 枚举类型会入侵到运行时的代码（会影响编译后的结果）；使用的类型在编译后大多会被移除，枚举不会，它将编译为一个双向的键值对对象（可以通过键获取值也可以通过值获取键）

