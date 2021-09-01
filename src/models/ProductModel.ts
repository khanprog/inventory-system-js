import * as mongoose from "mongoose"


const Schema = mongoose.Schema

export const ProductSchema = new Schema({
    title: {
        type: String,
        required: "enter product title"
    },
    price: {
        type: Number,
        required: "enter product price"
    },
    description:{
        type: String,
        required: "enter product description"
    },
    stock:{
        type: Number,
        default: 0
    },
    userid:{
        type: String,
        required: "user id required"
    },
    warehouseid:{
        type: String,
        default: "warehouse is required"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
