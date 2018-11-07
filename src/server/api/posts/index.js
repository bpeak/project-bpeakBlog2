import { Router } from 'express'
import * as ctrls from './ctrls'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'

const posts = Router()

posts.get('/:postId', ctrls.readPost)
posts.get('/', ctrls.readPosts)
posts.patch('/:postId/view', ctrls.updatePostView)

posts.post('/:postId/comment', (req, res, next) => {
    const isAsMember = req.query.isAsMember === 'true' ? true : false
    if(!isAsMember){ return ctrls.createComment(req, res) }
    next()
}, tokenValidationMiddleware, ctrls.createCommentForMember)

posts.post('/post/comment/:commentId/reply', (req, res, next) => {
    const isAsMember = req.query.isAsMember === 'true' ? true : false
    if(!isAsMember){ return ctrls.createReply(req, res) }
    next()
}, tokenValidationMiddleware, ctrls.createReplyForMember)

export default posts