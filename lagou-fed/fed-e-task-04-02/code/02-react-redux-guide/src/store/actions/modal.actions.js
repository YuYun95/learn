import { HIDEMODAL, SHOWMODAL } from "../const/modal.count"

export const show = () => ({ type: SHOWMODAL })

export const hide = () => ({ type: HIDEMODAL })