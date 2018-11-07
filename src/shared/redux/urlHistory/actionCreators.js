import * as actionTypes from './actionTypes'
import { createAction } from 'redux-actions'

export const enterToAuthPage = createAction(actionTypes.ENTER_TO_AUTH_PAGE) // from
export const readPrevUrlHistory = createAction(actionTypes.READ_PREV_URLHISTORY) // urlHistory object ( localstorage )