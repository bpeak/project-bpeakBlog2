import Email from '~db/models/email'
import textValidator from '~shared/modules/textValidator'
import * as emailConfig from '~shared/configs/email.config.json'

const createEmail = async (req, res) => {
    const { msg, email, name } = req.body
    const isBadRequest = (
        (!name) ||
        (name.constructor !== String) ||
        (!textValidator.validateMaxLength(name, emailConfig.NAME_CHAR_MAX)) ||
        (!textValidator.validateMinLength(name, emailConfig.NAME_CHAR_MIN)) ||

        (!msg) ||
        (msg.constructor !== String) ||
        (!textValidator.validateMaxLength(msg, emailConfig.MSG_CHAR_MAX)) ||

        (!email) ||
        (email.constructor !== String) ||
        (!textValidator.validateMaxLength(email, emailConfig.EMAIL_CHAR_MAX))
    )
    if(isBadRequest){ return res.sendStatus(400) }
    try{
        (await new Email({
            msg,
            email,
            name,
        }).save())
        res.status(201).json(JSON.stringify({
            isSuccess : true,
        }))
    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}

export default createEmail