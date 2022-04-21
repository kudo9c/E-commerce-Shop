const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {type: String, required:true, unique:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    fullname: {type: String},
    isAdmin:{
        type: Boolean,
        default: false,
    },
    img:{type:String, default:"https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"},
    address: {type: String},
    tel: {type: String}
    }, 
    {timestamps:true}
)

module.exports = mongoose.model("User", UserSchema)