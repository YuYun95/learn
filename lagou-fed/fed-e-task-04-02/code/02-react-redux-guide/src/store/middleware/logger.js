
const logger = store => next => action => {
    console.log(store)
    console.log(action)
    next(action) // 一定要调用next方法，action才能把结果传递给下一个中间件(reducer)，否则卡在这了
}

export default logger