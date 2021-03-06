import jwt from 'jsonwebtoken'
import { jwtConfig } from '~configs/secret/secret.config'
import User from '~db/models/user'

const tokenValidationMiddleware = async (req, res, next) => {
    try{
        const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1]
        //토큰 미존재
        if(!token) { return res.sendStatus(401) }

        const decoded = jwt.verify(token, jwtConfig.secret)
        const unique_id = decoded.user.unique_id
        const user = await User.findOne({ unique_id }).lean()

        //존재하지 않는 유저
        if(!user){ return res.sendStatus(401) }

        //인증 성공
        req.user = user
        return next()
    }
    catch(err){
        console.log(err)
        return res.sendStatus(401)
    }
}

export default tokenValidationMiddleware