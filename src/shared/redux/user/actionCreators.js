import * as actionTypes from './actionTypes'
import { createAction } from 'redux-actions'

export const loginSuccess = createAction(actionTypes.LOGIN_SUCCESS) // unique_id, token, isAdmin, nick, profileImgSrc
export const logoutSuccess = createAction(actionTypes.LOGOUT_SUCCESS) 

export const userProfileImgChanged = createAction(actionTypes.USER_PROFILE_IMG_CHANGED) // profileImgSrc
export const userProfileDetailsChanged = createAction(actionTypes.USER_PROFILE_DETAILS_CHANGED) // nick

export const readPrevUser = createAction(actionTypes.READ_PREV_USER) // user object ( localStorage )