import React, { Component } from 'react'
import { connect } from 'react-redux'
import fp from 'lodash/fp'
//modules
// import fetchCreator from '~modules/fetchCreator'
//components
import PostPage from '~components/pages/PostPage/PostPage'
const callApi = process.env.isBrowser ? require('~shared/modules/callApi').default : () => {}

const getPost = (allPosts, post_id) => {
    const postIndex = allPosts.findIndex(post => post._id === post_id)
    const post = postIndex === -1 ? null : allPosts[postIndex]
    return post
}

const getComments = (allComments, comments_ids, allReplies) => {
    const comments = comments_ids.reduce((comments, _id) => {
        const commentIndex = allComments.findIndex((comment) => {
            return _id === comment._id
        })
        if(commentIndex === -1) { return comments }
        const newComments = [allComments[commentIndex], ...comments]
        return newComments
    }, [])

    const commentsWithReplies = comments.map((comment) => {
        const replies_ids = comment.replies
        const replies = replies_ids.reduce((replies, reply_id) => {
            const replyIndex = allReplies.findIndex((reply) => {
                return reply._id === reply_id
            })
            if(replyIndex === -1){ return replies }
            return [allReplies[replyIndex], ...replies]
        }, [])

        const repliesByDate = [...replies].sort((a, b) => {
            return new Date(a.createdDate) - new Date(b.createdDate)
        })

        comment.replies = repliesByDate
        return comment
    })

    const commentsWithRepliesByDate = [...commentsWithReplies].sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate)
    })

    return commentsWithRepliesByDate
}

const mapStateToProps = (state, ownProps) => {
    const isPostsLoaded = state.posts.isLoaded
    const currentPost = (function () {
        if(!isPostsLoaded) { return undefined }
        const allPosts = fp.cloneDeep(state.posts.items)
        const currentPost_id = Number(ownProps.match.params.post_id)
        const currentPost = getPost(allPosts, currentPost_id)
        if(!currentPost){ return null }

        const allComments = fp.cloneDeep(state.posts.comments)
        const allReplies = fp.cloneDeep(state.posts.replies)
        const currentComments = getComments(allComments, currentPost.comments, allReplies)
        
        currentPost.comments = currentComments
        return currentPost
    })()

    return ({
        post : currentPost,
        userState : state.user,
    })
}

class PostPageContainer extends Component {
    state = { isUpdatedView : false }

    deletePost = () => {
        const { userState } = this.props
        const { post } = this.props
        return callApi(`/api/admin/posts/${post._id}`, {
            method : "DELETE",
            headers : {
                Authorization : `Bearer ${userState.token}`,
            },
        })
    }

    deleteComment = async (post_id, comment) => {
        const { userState } = this.props
        const confirmed = confirm(`post(${post_id})의 comment(${comment._id}) : ${comment.description} 댓글과 그 답글을 정말 삭제하시겠습니까?`)
        if(confirmed === true){
            const response = await callApi(`/api/admin/posts/${post_id}/comments/${comment._id}`, {
                method : "DELETE",
                headers : {
                    Authorization : `Bearer ${userState.token}`,
                },
            })
            if(response && response.isSuccess){ alert('삭제성공') }
        } else {
            alert('취소')
        }
    }

    deleteReply = async (reply) => {
        const { userState } = this.props
        const confirmed = confirm(`comment(${reply.comment_id})의 reply(${reply._id}) : ${reply.description} 을 정말 삭제하시겠습니까?)`)
        if(confirmed === true){
            const response = await callApi(`/api/admin/posts/post/comments/${reply.comment_id}/replies/${reply._id}`, {
                method : "DELETE",
                headers : {
                    Authorization : `Bearer ${userState.token}`,
                },
            })
            if(response && response.isSuccess){ alert('삭제성공') }
        } else {
            alert('취소')
        }
    }

    _setIsUpdatedView = (isUpdatedView) => { this.setState(() => ({ isUpdatedView }))}

    _updatePostView = (post_id) => {
        return fetch(`/api/posts/${post_id}/view`, {
            method : "PATCH",
        })
    }

    componentWillReceiveProps(nextProps){
        const { post } = nextProps
        if(post && !this.state.isUpdatedView){
            this._setIsUpdatedView(true)
            this._updatePostView(post._id)  
        }
    }

    componentDidMount(){
        const { post } = this.props
        if(post && !this.state.isUpdatedView){
            this._setIsUpdatedView(true)
            this._updatePostView(post._id)
        }
    }

    render() {
        return (
            <PostPage
            post={this.props.post}
            userState={this.props.userState}
            deletePost={this.deletePost}
            deleteComment={this.deleteComment}
            deleteReply={this.deleteReply}
            />
        )
    }
}

export default connect(mapStateToProps, null)(PostPageContainer)