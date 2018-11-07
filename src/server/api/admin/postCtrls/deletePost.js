import { Request, Response }from 'express'
import Post from '~db/models/post'

const deletePost = async (req, res) => {
    try{
        const post_id = Number(req.params.postId)
        await Post.findOneAndDelete({ _id : post_id })
        return res.status(200).json(JSON.stringify({ isSuccess : true }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default deletePost