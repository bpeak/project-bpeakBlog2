const readUserProfile = async (req, res) => {
    try{
        const { user } = req
        return res.status(200).json(JSON.stringify({
            user : {
                sex : user.sex
            }
        }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default readUserProfile