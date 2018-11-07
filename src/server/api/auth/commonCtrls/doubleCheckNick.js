import User from '~db/models/user'
import textValidator from '~shared/modules/textValidator'
import * as userConfig from '~shared/configs/user.config.json'

const doubleCheckNickCtrl = async (req, res) => {
    try{
        const { nick } = req.body
        const isBadRequset = (
            !nick ||
            nick.constructor !== String ||
            !textValidator.validateBlank(String(nick)) ||
            !textValidator.validateMinLength(String(nick), userConfig.NICK_CHAR_MIN) ||
            !textValidator.validateMaxLength(String(nick), userConfig.NICK_CHAR_MAX)
        )
        if(isBadRequset){ return res.sendStatus(400) }
        
        const condition = { nick }
        const userByNick = await User.findOne(condition).lean()
        const isAvailable = userByNick === null ? true : false
        return res.status(200).json(JSON.stringify({ isAvailable }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default doubleCheckNickCtrl