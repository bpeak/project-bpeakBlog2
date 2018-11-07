import * as actionTypes from './actionTypes'
import { handleActions } from 'redux-actions'

const initialState = {
    toAuthPageFrom : undefined,
}

const reducer = handleActions({
    [actionTypes.READ_PREV_URLHISTORY] : (state, action) => {
        const prevUrlHistoryState = Object.assign({}, action.payload.urlHistory)
        return prevUrlHistoryState
    },
    [actionTypes.ENTER_TO_AUTH_PAGE] : (state, action) => {
        return ({
            ...state,
            toAuthPageFrom : action.payload.from
        })
    }
}, initialState)

export default reducer