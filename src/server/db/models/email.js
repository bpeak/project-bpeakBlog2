import * as mongoose from 'mongoose'
import * as autoIncrement from 'mongoose-auto-increment'

const Schema = mongoose.Schema
const emailSchema = new Schema({
    name : { type : String, required : true }, 
    msg : { type : String, required : true },
    email : { type : String, required : true },
    createdDate : { type : Date, default : Date.now },
})

const Email = mongoose.model('email', emailSchema)
export default Email
autoIncrement.initialize(mongoose.connection)
emailSchema.plugin(autoIncrement.plugin, 'email')