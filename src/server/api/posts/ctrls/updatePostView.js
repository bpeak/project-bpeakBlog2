import { Request, Response } from 'express'
import Post from '~db/models/post'

const updatePostView = async (req, res) => {
    try{
        const post_id = req.params.postId
        const conditions = { _id : post_id }
        const post = await Post.findOne(conditions)
        if(!post) { return res.sendStatus(410) }
        post.views += 1
        await post.save()
        return res.sendStatus(204)
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default updatePostView