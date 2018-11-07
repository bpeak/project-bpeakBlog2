import VisitorCard from '~db/models/visitorCard'
import * as visitorCardConfig from '~shared/configs/visitorCard.config.json'
import textValidator from '~shared/modules/textValidator'

const writeNonMemberVisitorCardCtrl = async (req, res) => {
    try{
        const { description , nick } = req.body
        const isBadRequest = (
            (!description) ||
            (description.constructor !== String) ||
            (!textValidator.validateMaxLength(description, visitorCardConfig.DESCRIPTION_CHAR_MAX)) ||
    
            (!nick) ||
            (nick.constructor !== String) ||
            (!textValidator.validateBlank(nick)) ||
            (!textValidator.validateMinLength(nick, visitorCardConfig.NICK_CHAR_MIN)) ||
            (!textValidator.validateMaxLength(nick, visitorCardConfig.NICK_CHAR_MAX))
        )
        if(isBadRequest){ return res.sendStatus(400) }

        const visitorCard = (await new VisitorCard({
            isMember : false,
            isAdmin : false,
            description,
            nonMemberAuthor : { nick }
        }).save())
        .toObject()

        return res.status(201).json(JSON.stringify({
            visitorCard : {
                _id : visitorCard._id,
                isMember : visitorCard.isMember,
                isAdmin : visitorCard.isAdmin,
                description : visitorCard.description,
                nonMemberAuthor : { nick : visitorCard.nonMemberAuthor.nick },
                createdDate : visitorCard.createdDate
            }
        }))
        
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }    
}

export default writeNonMemberVisitorCardCtrl