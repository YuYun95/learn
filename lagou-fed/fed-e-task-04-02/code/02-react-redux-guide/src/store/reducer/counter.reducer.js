import { DECREMENT, INCREMENT } from "../const/counter.count"

const initialState = {
    count: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {...state, count: state.count + action.payload }
        case DECREMENT:
            return {...state, count: state.count - action.payload }
        default:
            return state
    }
}
