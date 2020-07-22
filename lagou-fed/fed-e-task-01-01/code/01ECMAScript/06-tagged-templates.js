// 带标签的模板字符串
const str = console.log`hello world`

const name = 'tom'
const gender = true

function myTagFunc(strings, name, gender) {

  console.log(strings) // [ 'hey, ', ' is a ', '' ]
  console.log(name, gender) // tom true
  // return '123'

  const sex = gender ? 'man' : 'woman'
  return strings[0] + name + strings[1] + sex + strings[2]
}

const reslt = myTagFunc`hey, ${name} is a ${gender}`
console.log(reslt)
