import { HIDEMODAL, SHOWMODAL } from "../const/modal.count"

const initialState = {
    show: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SHOWMODAL:
            return {...state, show: true }
        case HIDEMODAL:
            return {...state, show: false }
        default:
            return state
    }
}
