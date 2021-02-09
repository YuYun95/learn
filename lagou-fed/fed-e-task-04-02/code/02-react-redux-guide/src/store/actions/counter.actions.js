import { DECREMENT, INCREMENT } from "../const/counter.count"

export const increment = payload => ({ type: INCREMENT, payload })

export const decrement = payload => ({ type: DECREMENT, payload })