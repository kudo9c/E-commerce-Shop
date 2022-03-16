const mongoose = require("mongoose")


const ValueSchema = new mongoose.Schema({
    productID: {type: String, required:true},
    attributes: [
        {
            attributeID: {type: String, required:true},
            label: {type: String},
            value: {type: String, required:true}
        }
    ]
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("Value", ValueSchema)