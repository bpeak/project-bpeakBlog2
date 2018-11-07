import Post from '~db/models/post'
import User from '~db/models/user'
import Comment from '~db/models/comment'
import Reply from '~db/models/reply'

const readPost = async (req, res) => {
    try {
        const post_id = Number(req.params.postId)
        const isBadRequest = (
            post_id === NaN ||
            !Number.isInteger(post_id)
        )
        if(isBadRequest){ return res.sendStatus(400) }

        const filterOptions = {
            _id : post_id,
            isPublished : true,
        }
        const populateOptions = { 
            path : 'author', 
            select : '-_id nick profileImgSrc',
        }

        const post = await Post.findOne(filterOptions)
        .populate(populateOptions)
        .lean()

        res.status(200).json(JSON.stringify({ post }))
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export default readPost