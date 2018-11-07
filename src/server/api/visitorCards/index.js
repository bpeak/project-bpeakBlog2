import { Router } from 'express'
import * as ctrls from './ctrls'
import tokenValidationMiddleware from '~middlewares/tokenValidationMiddleware'

const visitorCards = Router()

visitorCards.get('/', ctrls.readVisitorCards)
visitorCards.post('/', async (req, res, next) => {
    const isAsMember = req.query.isAsMember === 'true' ? true : false
    if(!isAsMember){
        return ctrls.createVisitorCard(req, res)
    } else {
        return next()
    }
}, tokenValidationMiddleware, ctrls.createVisitorCardForMember)

export default visitorCards