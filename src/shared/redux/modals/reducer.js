import * as actionTypes from './actionTypes'
import { handleActions } from 'redux-actions'

const initialState = { isOpendModalBlogMenu : false }

const reducer = handleActions({
    [actionTypes.OPEN_MODAL_BLOG_MENU] : (state, action) => {
        return { isOpendModalBlogMenu : true }
    },
    [actionTypes.CLOSE_MODAL_BLOG_MENU] : (state, action) => {
        return { isOpendModalBlogMenu : false }
    }
}, initialState)

export default reducer