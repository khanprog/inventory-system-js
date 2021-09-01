import * as mongoose from "mongoose"


const Schema = mongoose.Schema

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: "enter first name"
    },
    lastName: {
        type: String,
        required: "enter last name"
    },
    email:{
        type: String,
        required: "enter email id"
    },
    password:{
        type: String,
        required: "enter valid password"
    },
    role:{
        type: Number,
        default: 0
    },
    status:{
        type: String,
        default: "pending"
    },
    token:{
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
