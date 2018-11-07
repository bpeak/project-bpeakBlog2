import * as actionTypes from './actionTypes'
import { handleActions } from 'redux-actions'

const initialState = { 
    items : undefined,
}

const reducer = handleActions({
    [actionTypes.RECEIVED_VISITORCARDS] : (state, action) => ({
        ...state,
        items : action.payload.visitorCards,
    }),
    [actionTypes.RECEIVED_NEW_VISITORCARD] : (state, action) => ({
        ...state,
        items : [action.payload.visitorCard, ...state.items]
    })
}, initialState)

export default reducer