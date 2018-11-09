import Comment from '~db/models/comment'
import Reply from '~db/models/reply'

const deleteReply = async (req, res) => {
    try{
        const comment_id = req.params.commentId
        const reply_id = req.params.replyId
        
        // delete reply
        const replyQueryOptions = {
            filter : { _id : reply_id }
        }
        await Reply.findOneAndDelete(replyQueryOptions.filter)

        // delete reply in comment
        const commentQueryOptions = {
            filter : { _id : comment_id },
            update : { $pull : { replies : reply_id }}
        }
        await Comment.findOneAndUpdate(commentQueryOptions.filter, commentQueryOptions.update)

        return res.status(200).json(JSON.stringify({
            isSuccess : true
        }))
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export default deleteReply