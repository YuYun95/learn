import { createStore, applyMiddleware } from 'redux'
import RootReducer from "./reducer/root.reducer";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas/root.saga";
// import thunk from 'redux-thunk'
// import logger from './middleware/logger'
// import test from "./middleware/test";
// import thunk from "./middleware/thunk";

// 创建sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(RootReducer, applyMiddleware(sagaMiddleware))

// 启动saga
sagaMiddleware.run(rootSaga)