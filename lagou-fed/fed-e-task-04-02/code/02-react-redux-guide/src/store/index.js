import { createStore } from 'redux'
import RootReducer from "./reducer/root.reducer";

export const store = createStore(RootReducer)
