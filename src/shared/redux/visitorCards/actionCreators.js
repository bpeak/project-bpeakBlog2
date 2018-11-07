import * as actionTypes from './actionTypes'
import { createAction } from 'redux-actions'

export const receivedVisitorCards = createAction(actionTypes.RECEIVED_VISITORCARDS) // visitorCards
export const receivedNewVisitorCard = createAction(actionTypes.RECEIVED_NEW_VISITORCARD) // visitorCard