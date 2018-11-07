import * as mongoose from 'mongoose'
import * as autoIncrement from 'mongoose-auto-increment'

const Schema = mongoose.Schema
const commentSchema = new Schema({
    post_id : { type : Number, required : true },
    isMember : { type : Boolean, required : true },
    isAdmin : { type : Boolean, required : true },
    memberAuthor : { type : mongoose.Schema.Types.ObjectId, ref : 'user' },
    unique_id : { type : String },
    key : {
        hash : { type : String },
        salt : { type : String }
    },
    description : { type : String, required : true },
    createdDate : { type : Date, default : Date.now },
    replies : [{ type : Number, ref : 'reply' }]
})

const Comment = mongoose.model('comment', commentSchema)
export default Comment
autoIncrement.initialize(mongoose.connection)
commentSchema.plugin(autoIncrement.plugin, 'comment')