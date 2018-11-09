import User from '~db/models/user'

const adminValidationMiddleware = async (req, res, next) => {
    try{
        const { user } = req
        const user_unique_id = user.unique_id
        const userByUniqueId = await User.findOne({ unique_id : user_unique_id }).lean()
        if(!user.isAdmin || !userByUniqueId || !userByUniqueId.isAdmin) { return res.sendStatus(403) }
        next()
    }
    catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}

export default adminValidationMiddleware