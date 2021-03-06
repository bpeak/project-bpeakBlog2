import { Request, Response } from 'express'
import Post from '~db/models/post'

const readPost = async (req, res) => {
    try{
        const post_id = req.params.postId
        const post = await Post.findOne({ _id : post_id }).lean()
        return res.status(200).json(JSON.stringify({ post }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}   

export default readPost