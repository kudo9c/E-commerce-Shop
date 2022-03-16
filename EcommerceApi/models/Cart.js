const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
    {
    userID: {type: String, required:true, unique:true},
    products: [
        {
            productID:{
                type: String,
            },
            quantity: {
                type: Number,
                default:1,
            },

        }
    ],
    quantity: {type: Number},
    total: {type: Number}
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("Cart",CartSchema)