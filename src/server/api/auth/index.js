import { Router } from 'express'
import * as commonCtrls from './commonCtrls'
import * as localCtrls from './localCtrls'

const auth = Router()

// common
auth.post('/doubleCheckNick', commonCtrls.doubleCheckNick)
// local
auth.post('/local/join', localCtrls.join)
auth.post('/local/login', localCtrls.login)
auth.post('/local/doubleCheckEmail', localCtrls.doubleCheckEmail)
// social
// auth.get('/social/kakao', socialCtrls.kakaoCtrl)
// auth.get('/social/kakao/callback', socialCtrls.kakaoCallbackCtrl)
// auth.get('/social/naver', socialCtrls.naverCtrl)
// auth.get('/social/naver/callback', socialCtrls.naverCallbackCtrl)

// auth.get('/social/google', socialCtrls.googleCtrl)

// auth.get('/social/preUser', socialCtrls.getPreUserCtrl)
// auth.post('/social/join', socialCtrls.joinCtrl)


export default auth