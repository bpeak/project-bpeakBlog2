import * as React from 'react'
import { Route, Switch } from 'react-router'
//routes
import PostsPageRoute from '~routes/PostsPageRoute'

//components
import AboutMePage from '~components/pages/AboutMePage/AboutMePage'
import NotFoundPage from '~components/pages/NotFoundPage/NotFoundPage'
//containers
import HomePageContainer from '~containers/HomePageContainer'
import PostPageContainer from '~containers/PostPageContainer'
import VisitorsPageContainer from '~containers/VisitorsPageContainer'
import JoinPageContainer from '~containers/JoinPageContainer'
import LoginPageContainer from '~containers/LoginPageContainer'
import ProfilePageContainer from '~containers/ProfilePageContainer'
import AdminPageContainer from '~containers/AdminPageContainer'

import * as userActionCreators from '~redux/user/actionCreators'
import * as urlActionCreators from '~redux/urlHistory/actionCreators'
import { connect } from 'react-redux'

const store = process.env.isBrowser ? require('~redux/store').default : null

class App extends React.Component {

    componentDidMount(){
        const localStorageUser = JSON.parse(localStorage.getItem('user'))
        const localStorageUrlHistory = JSON.parse(localStorage.getItem('urlHistory'))
        if(localStorageUser){
            store.dispatch(userActionCreators.readPrevUser({
                user : localStorageUser
            }))
        }
        if(localStorageUrlHistory){
            store.dispatch(urlActionCreators.readPrevUrlHistory({
                urlHistory : localStorageUrlHistory
            }))
        }
    }

    render () {
        return (
            <Switch>
                <Route exact path="/" component={HomePageContainer}/>
                <Route exact path="/aboutme" component={AboutMePage}/>
                <Route exact path="/join" component={JoinPageContainer}/>
                <Route exact path="/login" component={LoginPageContainer}/>
                <Route exact path="/post/:post_id/" component={PostPageContainer}/>
                <Route exact path="/posts/" component={PostsPageRoute}/>
                <Route exact path="/posts/:category(all|dev|etc|notice|tag|search)" component={PostsPageRoute}/>
                <Route exact path="/posts/:category(all|dev|etc|notice|tag|search)/page/:pageIndex" component={PostsPageRoute}/>                
                <Route exact path="/visitors" component={VisitorsPageContainer}/>
                <Route path="/profile" component={ProfilePageContainer}/>
                <Route path="/admin" component={AdminPageContainer}/>
                <Route component={NotFoundPage}/>
            </Switch>
        )
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     userActions : {
//         readPrevUser : (payload) => { dispatch(userActionCreators.readPrevUser(payload)) }
//     },
//     urlHistoryActions : {
//         readPrevUrlHistory : (payload) => { dispatch(urlHistoryActionCreators.readPrevUrlHsitory(payload)) }
//     }
// })

export default App