import { Router } from 'express'
import * as postCtrls from './postCtrls'
import * as visitorCardCtrls from './visitorCardCtrls'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'
import fileToBufferMiddleware from '~middlewares/fileToBufferMiddleware'
import adminValidationMiddleware from './adminValidationMiddleware'
const admin = Router()

admin.use('*', tokenValidationMiddleware)
admin.use('*', adminValidationMiddleware)

// posts
admin.get(   '/posts', postCtrls.readPosts)
admin.post(  '/posts', fileToBufferMiddleware.single('coverImgFile'), postCtrls.createPost)
admin.get(   '/posts/:postId', postCtrls.readPost)
admin.delete('/posts/:postId', postCtrls.deletePost)
admin.patch( '/posts/:postId', fileToBufferMiddleware.single('coverImgFile'), postCtrls.updatePost)
admin.post(  '/postImgFile', fileToBufferMiddleware.single('imgFile'), postCtrls.preUploadPostImgFile)

// comments
admin.delete('/posts/:postId/comments/:commentId', postCtrls.deleteComment)

// replies
admin.delete('/posts/post/comments/:commentId/replies/:replyId', postCtrls.deleteReply)

// visitorCards
admin.delete('/visitorCards/:_id', visitorCardCtrls.deleteVisitorCard)

export default admin