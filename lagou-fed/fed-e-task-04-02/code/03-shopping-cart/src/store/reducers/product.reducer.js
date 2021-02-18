import { handleActions as createReducer } from 'redux-actions'
import { saveProducts } from '../actions/product.actions'

const initialState = []

// 将商品列表数据保存到本地store对象中
const handleSaveProducts = (state, action) => action.payload

export default createReducer({
    // 将商品列表数据保存到本地store对象中
    [saveProducts]: handleSaveProducts
}, initialState)