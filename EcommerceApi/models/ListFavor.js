const mongoose = require("mongoose")

const FavorSchema = new mongoose.Schema(
    {
    userID: {type: String, required:true, unique:true},
    products: [
        {
            productID:{
                type: String,
            },
            title: {type: String, required:true},
            img: {type: String, required:true},
        }
    ],
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("Favor",FavorSchema)