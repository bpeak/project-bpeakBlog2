import * as actionTypes from './actionTypes'
import { createAction } from 'redux-actions'

export const openModalBlogMenu = createAction(actionTypes.OPEN_MODAL_BLOG_MENU)
export const closeModalBlogMenu = createAction(actionTypes.CLOSE_MODAL_BLOG_MENU)