const mongoose = require("mongoose")

const AttributeSchema = new mongoose.Schema({
    label: {type: String, required:true}
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("Attribute", AttributeSchema)