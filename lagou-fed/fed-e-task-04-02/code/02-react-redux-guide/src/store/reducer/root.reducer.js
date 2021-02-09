import { combineReducers } from 'redux'
import CounterReducer from "./counter.reducer";
import ModalReducer from "./modal.recucer";

// store容器的结构 {counter: { count: 0 }, modal: { show: false }}
export default combineReducers({
    counter: CounterReducer,
    modal: ModalReducer
})