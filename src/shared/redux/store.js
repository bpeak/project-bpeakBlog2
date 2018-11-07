import postsReducer from './posts/reducer'
import userReducer from './user/reducer'
import modalsReducer from './modals/reducer'
import urlHistoryReducer from './urlHistory/reducer'
import visitorCardsReducer from './visitorCards/reducer'
import popupsReducer from './popups/reducer'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

const rootReducer = combineReducers({
    posts : postsReducer,
    user : userReducer,
    modals : modalsReducer,
    urlHistory : urlHistoryReducer,
    visitorCards : visitorCardsReducer,
    popups : popupsReducer,
})

const preLoadedState = window.__PRELOADED_STATE__

// const preLoadedStateFromServer = window.__PRELOADED_STATE__
// const preLoadedStateFromLocal = (function () {
//     const preLoadedStateFromLocal = {}
//     const localStorageUser = JSON.parse(localStorage.getItem('user'))
//     const localStorageUrlHistory = JSON.parse(localStorage.getItem('urlHistory'))
//     if(localStorageUser){ preLoadedStateFromLocal.user = localStorageUser } 
//     if(localStorageUrlHistory){ preLoadedStateFromLocal.urlHistory = localStorageUrlHistory }
//     return preLoadedStateFromLocal
// })()

// const preLoadedState = Object.assign({}, preLoadedStateFromServer, preLoadedStateFromLocal)

const store = preLoadedState ? createStore(rootReducer, preLoadedState, applyMiddleware(createLogger())) : createStore(rootReducer, applyMiddleware(createLogger()))

const userStateObserver = (function(prevUserState){
    const updateLocalStorage = (userState) => {
        window.localStorage.setItem('user', JSON.stringify(userState))
    }
    const updatePrevUserState = (userState) => {
        prevUserState = userState
    }

    return function (nextUserState) {
        if(prevUserState !== nextUserState){
            updateLocalStorage(nextUserState)
            updatePrevUserState(nextUserState)
        }
    }
})(store.getState().user)

const urlHistoryObserver = (function (prevUrlHistory) {
    const updateLocalStorageUrlHistory = (urlHistory) => {
        localStorage.setItem('urlHistory', JSON.stringify(urlHistory))
    }
    const updatePrevUrlHistory = (urlHistory) => {
        prevUrlHistory = urlHistory
    }

    return function (nextUrlHistory) {
        if(prevUrlHistory !== nextUrlHistory){
            updatePrevUrlHistory(nextUrlHistory)
            updateLocalStorageUrlHistory(nextUrlHistory)
        }
    }

})(store.getState().urlHistory)

store.subscribe(() => {
    userStateObserver(store.getState().user)
    urlHistoryObserver(store.getState().urlHistory)
})

export default store