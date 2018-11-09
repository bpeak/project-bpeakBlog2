import Post from '~db/models/post'
import Comment from '~db/models/comment'
import Reply from '~db/models/reply'

const deleteComment = async (req, res) => {
    try {
        const post_id = req.params.postId
        const comment_id = req.params.commentId
    
        const comment = await Comment.findOne({ _id : comment_id }).lean()
        const replyQueryOptions = {
            filter : { _id : { $in : comment.replies }}
        }

        // delete replies in target comment
        await Reply.deleteMany(replyQueryOptions.filter)
    
        // delete target comment
        const commentQueryOptions = {
            filter : { _id : comment_id }
        }
        await Comment.findOneAndDelete(commentQueryOptions.filter)
    
        // delete comment in post
        const postQueryOptions = {
            filter : { _id : post_id },
            update : { $pull : { comments : comment_id } }
        }
    
        await Post.findOneAndUpdate(postQueryOptions.filter, postQueryOptions.update)
        res.status(200).json(JSON.stringify({
            isSuccess : true
        }))
    }
    catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}

export default deleteComment