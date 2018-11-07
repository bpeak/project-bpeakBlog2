const adminValidationMiddleware = (req, res, next) => {
    const { user } = req
    if(!user.isAdmin) { return res.sendStatus(403) }
    next()
}

export default adminValidationMiddleware