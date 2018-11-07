import postsReducer from './posts/reducer'
import userReducer from './user/reducer'
import modalsReducer from './modals/reducer'
import urlHistoryReducer from './urlHistory/reducer'
import visitorCardsReducer from './visitorCards/reducer'
import popupsReducer from './popups/reducer'
import { combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
    posts : postsReducer,
    user : userReducer,
    modals : modalsReducer,
    urlHistory : urlHistoryReducer,
    visitorCards : visitorCardsReducer,
    popups : popupsReducer,
})

export default (preLoadedState) => {
    const store = preLoadedState ? createStore(rootReducer, preLoadedState) : createStore(rootReducer)
    return store
}