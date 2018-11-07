import User from '~db/models/user'
import * as memberTypes from '~constants/memberTypes'
//shared
import textValidator from '~shared/modules/textValidator'
import * as userConfig from '~shared/configs/user.config.json'

const doubleCheckEmail = async (req, res) => {
    try {
        const { email } = req.body

        const isBadRequest = (
            !email ||
            !textValidator.validateMaxLength(String(email), userConfig.EMAIL_CHAR_MAX) ||
            !textValidator.validateBlank(String(email))
        )

        if(isBadRequest){ return res.sendStatus(400) }
    
        const condition = {
            email : String(email),
            memberType : memberTypes.LOCAL
        }

        const userByEmail = await User.findOne(condition).lean()
        const isAvailable = userByEmail === null ? true : false
        return res.json(JSON.stringify({
            isSuccess : true,
            isAvailable
        }))
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export default doubleCheckEmail