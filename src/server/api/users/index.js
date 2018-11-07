import { Router } from 'express'
import * as ctrls from './ctrls'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'
import fileToBufferMiddleware from '~middlewares/fileToBufferMiddleware'

const users = Router()

users.use('*', tokenValidationMiddleware)

users.get('/me', ctrls.readUserProfile)
users.patch('/me/details', ctrls.updateUserDetails)
users.patch('/me/password', ctrls.updateUserPassword)
users.patch('/me/profileImgSrc', fileToBufferMiddleware.single('profileImgFile'), ctrls.updateUserProfileImg)

export default users