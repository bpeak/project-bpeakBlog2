import Email from '~db/models/email'

const readEmails = async (req, res) => {
    let emails
    try{
        emails = await Email.find()
    } catch (err){
        console.log(err)
        return res.sendStatus(500)
    }
    return res.json(JSON.stringify({
        emails,
    }))
}

export default readEmails