import React from 'react'
import App from '../shared/App'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '~redux/store'
//modules
import history from '~shared/modules/history'
// containers
import ModalContainer from '~containers/ModalContainer'
import PopupsContainer from '~containers/PopupsContainer'
// withRouter
import PostsDataRequestContainerWithRouter from '~containers/PostsDataRequestContainerWithRouter'
import ScrollResetWithRouter from '~routes/ScrollResetWithRouter'
import RecordHistoryWithRouterContainer from '~containers/RecordHistoryWithRouterContainer'

ReactDOM.hydrate(
    <Provider store={store}>
        <Router history={history}>
            <RecordHistoryWithRouterContainer>
                <App/>
                <PopupsContainer/>
                <PostsDataRequestContainerWithRouter/>
                <ScrollResetWithRouter/>
                <ModalContainer/>
            </RecordHistoryWithRouterContainer>
        </Router>
    </Provider>
    ,
    document.getElementById('app-root')
)