import * as actionTypes from './actionTypes'
import { createAction } from 'redux-actions'

export const receivedPosts = createAction(actionTypes.RECEIVED_POSTS) // posts, comments, replies, date
export const receivedPost = createAction(actionTypes.RECEIVED_POST) // post
export const postCommentAdded = createAction(actionTypes.POST_COMMENT_ADDED) // comment
export const postCommentReplyAdded = createAction(actionTypes.POST_COMMENT_REPLY_ADDED) // reply


// export const postCommentAdded = createAction(actionTypes.POST_COMMENT_ADDED) // comment
// export const postCommentReplyAdded = createAction(actionTypes.POST_COMMENT_REPLY_ADDED) // reply

// export const postCommentReplyAdded = createAction(actionTypes.POST_COMMENT_REPLY_ADDED) // reply