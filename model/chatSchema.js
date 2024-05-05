const mongoose = require("mongoose")

const Chat = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reaction : Number
}, {timestamps:true});

module.exports = mongoose.model("Chat", Chat);