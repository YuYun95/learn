export const Button = () => {
  return document.createElement('button')

  console.log('dead-code') // 未引用代码
}

export const Link = () => {
  return document.createElement('a')
}

export const Heading = level => {
  return document.createElement('h' + level)
}