import { Router } from 'express'
import posts from './posts'
import visitorCards from './visitorCards'
import auth from './auth'
import users from './users'
import admin from './admin'
import chatbot from './chatbot'
import emails from './emails'

const api = Router()

api.use('/auth', auth)
api.use('/posts', posts)
api.use('/visitorCards', visitorCards)
api.use('/users', users)
api.use('/admin', admin)
api.use('/chatbot', chatbot)
api.use('/emails', emails)

export default api