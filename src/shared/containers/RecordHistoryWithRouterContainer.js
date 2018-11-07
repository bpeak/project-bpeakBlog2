import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
//actions
import * as urlHistoryActionCreators from '~redux/urlHistory/actionCreators'

const mapStateToProps = (state) => ({
    urlHistoryState : {
        toAuthPageFrom : state.urlHistory.toAuthPageFrom
    }
})

const mapDispatchToProps = (dispatch) => ({
    enterToAuthPage : (payload) => dispatch(urlHistoryActionCreators.enterToAuthPage(payload))
})

class A extends React.Component {
    
	componentWillReceiveProps(nextProps) {
		const prevPathname = this.props.location.pathname
		const nextPathname = nextProps.location.pathname
		if(
			(nextPathname === '/join' || nextPathname === '/login') &&
			(prevPathname !== '/join' && prevPathname !== '/login') 
		){
			const currentToAuthPageFrom = nextProps.urlHistoryState.toAuthPageFrom
			const queryParams = decodeURIComponent(this.props.location.search)
			const nextToAuthPageFrom = `${prevPathname}${queryParams}`
			if(currentToAuthPageFrom !== nextToAuthPageFrom) {
				this.props.enterToAuthPage({ from : nextToAuthPageFrom })
			}
		}
    }
    
    render () {
        return this.props.children
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(A))