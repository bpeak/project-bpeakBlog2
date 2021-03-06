import React, { Component } from 'react'
import { connect } from 'react-redux'
//modules
const callApi = process.env.isBrowser ? require('~shared/modules/callApi') : () => {}
//components
import InWritingPosts from '../components/molecules/InWritingPosts/InWritingPosts'

const mapStateToProps = (state) => ({
    userState : state.user
})

class InWritingPostsContainer extends Component {
    state = {
        posts : undefined
    }

    _setInWritingPosts = (posts) => { this.setState(() => ({ posts })) }

    _getInWritingPosts = () => {
        const { userState } = this.props
        return callApi('/api/admin/posts?kinds=inWriting', {
            method : "GET",
            headers : {
                Authorization : `Bearer ${userState.token}`,
            }
        })
    }

    async componentDidMount(){
        const response = await this._getInWritingPosts()
        this._setInWritingPosts(response.posts)
    }

    render() {
        return (
            <InWritingPosts
                posts={this.state.posts}
            />
        )
    }
}

export default connect(mapStateToProps, null)(InWritingPostsContainer)