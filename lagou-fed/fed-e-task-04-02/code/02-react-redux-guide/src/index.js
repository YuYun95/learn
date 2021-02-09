import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

/**
 * react-redux
 *  Provider  作用就是将我们创建出来的store放在一个全局组件够的着的地方，
 *            Provider要放在最外层
 *  conect    会帮助我们订阅store，store的状态更改后，会帮我们重新渲染组件
 *            可以拿到store的状态、可以把store状态映射到props中、可以拿到dispatch方法
 */
ReactDOM.render(
  // 通过Provider组件 将store放在了全局的组件可以够的到的地方
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
