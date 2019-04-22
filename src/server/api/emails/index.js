import { Router } from 'express'
import * as ctrls from './ctrls'

const emails = Router()

emails.post('/', ctrls.createEmail)

export default emails

