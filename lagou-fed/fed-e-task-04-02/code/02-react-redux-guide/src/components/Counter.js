import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import * as counterActions from '../store/actions/counter.actions'


function Counter({ count, increment, decrement }) {
    return <div>
        <button onClick={() => increment(5)}>+</button>
        <span>{count}</span>
        <button onClick={() => decrement(5)}>-</button>
    </div>
}

/**
 * 1. connent 方法会帮助我们订阅store 当store中的状态发生更改的时候，会帮助我们重新渲染组件
 * 2. connent 方法可以让我们获取store中的状态 将状态通过组件的props属性映射给组件
 * 3. connent 方法可以让我们获取dispatch方法
 */


const mapStateToProps = state => ({
    count: state.counter.count,
    a: 'a'
})



const mapDispatchToProps = dispatch => bindActionCreators(counterActions, dispatch)

/**
 * 1. connect 方法返回的是另外一个方法(高阶组件)，返回的方法要求我们传递一个组件，因为当store发生改变时要知道改变哪个组件；状态映射给哪个组件的props属性
 * 2. connect 方法第一个参数是一个函数，这个函数有一个形参，把它命名为state，这个state就是组件当中的状态，这个函数返回一个对象，会传递到组件中
 * 3. connect 方法的第二个参数也是一个函数，他可以拿到dispatch方法
 */

export default connect(mapStateToProps, mapDispatchToProps)(Counter)