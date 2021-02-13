// import { HIDEMODAL, SHOWMODAL, SHOWMODAL_ASYNC } from "../const/modal.count"

// export const show = () => ({ type: SHOWMODAL })

// export const hide = () => ({ type: HIDEMODAL })

// export const show_async = () => ({ type: SHOWMODAL_ASYNC })

import { createAction } from "redux-actions";

export const show = createAction('showModal')

export const hide = createAction('hideModal')
