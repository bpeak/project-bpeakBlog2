import VisitorCard from '~db/models/visitorCard'

const readVisitorCards = async (req, res) => {
    try{
        const sortOption = { createdDate : - 1 }
        const populateOption = { path : 'memberAuthor', select : '-_id nick profileImgSrc'}
        const visitorCards = await VisitorCard
        .find()
        .sort(sortOption)
        .populate(populateOption)
        return res.status(200).json(JSON.stringify({ visitorCards }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    } 
}

export default readVisitorCards