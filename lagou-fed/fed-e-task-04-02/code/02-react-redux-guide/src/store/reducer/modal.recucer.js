// import { HIDEMODAL, SHOWMODAL } from "../const/modal.count"

// const initialState = {
//     show: false
// }

// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//         case SHOWMODAL:
//             return {...state, show: true }
//         case HIDEMODAL:
//             return {...state, show: false }
//         default:
//             return state
//     }
// }

import { handleActions as createAction } from "redux-actions";
import { hide, show } from "../actions/modal.actions";
const initialState = {
    show: false
}

const handleShow = state => ({ show: true })
const handleHide = state => ({ show: false })

export default createAction({
    [show]: handleShow,
    [hide]: handleHide
}, initialState)


