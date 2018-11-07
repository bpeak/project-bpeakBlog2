import User from '~db/models/user'
import Encryption from '~modules/Encryption'
import textValidator from '~shared/modules/textValidator'
import TokenManager from '~modules/TokenManager'
import userConfig from '~shared/configs/user.config.json'
import * as memberTypes from '~constants/memberTypes'
import * as sexTypes from '~constants/sexTypes'

const join = async (req, res) => {
    try{
        const { email, nick, sex, password } = req.body
        console.log(email,nick, sex, password)
        const isBadRequest = (
            !email ||
            !textValidator.validateBlank(String(email)) ||
            !textValidator.validateMaxLength(String(email), userConfig.EMAIL_CHAR_MAX) ||
    
            !nick ||
            !textValidator.validateBlank(String(nick)) ||
            !textValidator.validateMinLength(String(nick), userConfig.NICK_CHAR_MIN) ||
            !textValidator.validateMaxLength(String(nick), userConfig.NICK_CHAR_MAX) ||
    
            !password ||
            !textValidator.validateBlank(String(password)) ||
            !textValidator.validateMaxLength(String(password), userConfig.PASSWORD_CHAR_MAX) ||
            !textValidator.validateMinLength(String(password), userConfig.PASSWORD_CHAR_MIN) ||

            !sex ||
            !(String(sex) === sexTypes.M || String(sex) === sexTypes.W)
        )

        if(isBadRequest) { return res.sendStatus(400) }

        const userByEmail = await User.findOne({ memberType : memberTypes.LOCAL, email : String(email) }).lean()
        if(userByEmail !== null){ return res.status(200).json(JSON.stringify({ 
            isSuccess : false, errMsg : '이미 존재하는 이메일입니다.' 
        }))}
        const userByNick = await User.findOne({ nick : String(nick) }).lean()
        if(userByNick !== null){ return res.status(200).json(JSON.stringify({ 
            isSuccess : false, errMsg : '이미 존재하는 이메일입니다.' 
        })) }

        const isAdmin = (await User.findOne().lean()) === null
        const { hash, salt } = Encryption.getPwSet(String(password))
        const user = (await new User({
            unique_id : String(Number(new Date())),
            isAdmin,
            memberType : memberTypes.LOCAL,
            nick : String(nick),
            sex : String(sex),
            email : String(email),
            key : {
                hash,
                salt
            }
        }).save()).toObject()

        const token = TokenManager.issue(user.unique_id)

        return res.status(201).json(JSON.stringify({
            isSuccess : true,
            user : {
                token,
                unique_id : user.unique_id,
                nick : user.nick,
                profileImgSrc : user.profileImgSrc,
                isAdmin : user.isAdmin
            }
        }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default join