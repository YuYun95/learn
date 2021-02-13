import { takeEvery, put, delay } from "redux-saga/effects";
import { increment } from "../actions/counter.actions";
import { INCREMENT_ASYNC } from "../const/counter.count";

// takeEvery接收action
// put触发 action
// delay 延迟

// 不可以用定时器做延迟，要使用saga提供的delay方法做延迟
function* increment_async_fn(action) {
    yield delay(2000)
    yield put(increment(action.payload))
}

export default function* counterSaga() {
    // 接收action
    yield takeEvery(INCREMENT_ASYNC, increment_async_fn)
    
}