import * as actionTypes from './actionTypes'
import { handleActions } from 'redux-actions'

const initialState = []

const reducer = handleActions({
    [actionTypes.OPEN_POPUP] : (state, action) => {
        return [
            ...state,
            {
                unique_id : action.payload.unique_id,
                popupType : action.payload.popupType,
                icon : action.payload.icon,
                title : action.payload.title,
                description : action.payload.description,
            }
        ]
    },
    [actionTypes.CLOSE_POPUP] : (state, action) => {
        const prevPopups = state
        const nextPopups = prevPopups.filter(popup => {
            return ( action.payload.unique_id !== popup.unique_id )
        })
        return nextPopups
    }
}, initialState)

export default reducer