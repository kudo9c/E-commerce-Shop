const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
    userID: {type: String, required:true},
    products: [
        {
            _id: {type: String, required:true},
            title: {type: String, required:true},
            desc: {type: String, required:true},
            img: {type: String, required:true},
            categories: {type: Array},
            combo: {type: Array},
            color: {type: Array},
            price: {type: Number, required:true},
        }
    ],
    quantity: {type:Number,required:true},
    total: {type:Number,required:true},
    name: {type: String, required: true},
    address: {type:String, required: true},
    tel: {type: String, required: true},
    email: {type: String, required: true},
    city: {type: String, required: true},
    status: {type:String,default:"Chờ xác nhận"},
    }, 
    {timestamps:true}
)
module.exports = mongoose.model("Order",OrderSchema)