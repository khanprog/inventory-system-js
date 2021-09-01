import * as mongoose from "mongoose"


const Schema = mongoose.Schema

export const WarehouseSchema = new Schema({
    name: {
        type: String,
        required: "enter warehouse name"
    },
    location: {
        type: String,
        required: "enter warehouse location"
    },
    description:{
        type: String,
        required: "enter warehouse description"
    },
    userid:{
        type: String,
        required: "user id required"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
