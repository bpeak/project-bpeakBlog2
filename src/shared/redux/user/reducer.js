import * as actionTypes from './actionTypes'
import { handleActions } from 'redux-actions'

const initialState = {
    isLoggedIn : false,
    token : undefined,
    isAdmin : false,
    unique_id : undefined,
    nick : undefined,
    profileImgSrc : undefined
}

const reducer = handleActions({
    [actionTypes.READ_PREV_USER] : (state, action) => {
        const prevUserState = Object.assign({}, action.payload.user)
        return prevUserState
    },
    [actionTypes.LOGIN_SUCCESS] : (state, action) => {
        return ({
            ...state,
            isLoggedIn : true,
            unique_id : action.payload.unique_id,
            isAdmin : action.payload.isAdmin,
            token : action.payload.token,
            nick : action.payload.nick,
            profileImgSrc : action.payload.profileImgSrc,
        })
    },
    [actionTypes.LOGOUT_SUCCESS] : (state, action) => {
        return initialState
    },
    [actionTypes.USER_PROFILE_IMG_CHANGED] : (state, action) => {
        return ({
            ...state,
            profileImgSrc : action.payload.profileImgSrc
        })
    },
    [actionTypes.USER_PROFILE_DETAILS_CHANGED] : (state, action) => {
        return ({
            ...state,
            nick : action.payload.nick,
        })
    }
}, initialState)

export default reducer