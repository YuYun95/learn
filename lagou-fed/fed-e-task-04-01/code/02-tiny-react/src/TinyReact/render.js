import diff from './diff'

// render方法提供给框架使用者使用
export default function render(virtualDOM, container, oldDOM = container.firstChild) {
  diff(virtualDOM, container, oldDOM)
}
