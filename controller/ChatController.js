const User = require("../model/UserSchema")
const Chat = require("../model/chatSchema");
const { default: mongoose } = require("mongoose");


exports.sendMessage = async(req, res, next) =>{
    try {
        const {message, reciever_id} = req.body;

        if(!message || !reciever_id){
            return res.status(404).json({
                message:"Enter valid input...!"
            })
        }

        const reciever = await User.findById(reciever_id);
        if(!reciever)
            return res.status(404).json({
                message:"User not found...!"
            })
        const newChat = await Chat.create({
            message:message,
            sender:req.user._id,
            reciever:reciever_id
        })

        res.status(201).json({
            message:"New message send...!",
            newChat
        })
    } catch (error) {
        next(error);
    }
}


exports.getAllMessages = async (req, res, next) =>{
    try {
        let reciever = req.params.id;
        let sender = req.user._id;
        // reciever = mongoose.Schema.Types.ObjectId(reciever);
        // sender = mongoose.Schema.Types.ObjectId(sender);

        const allMessages = await Chat.find({
            $or:[
                {$and :[{sender : {$eq:sender}}, {reciever : {$eq:reciever}}]},
                {$and :[{sender : {$eq:reciever}}, {reciever : {$eq:sender}}]},
            ]
        });

        res.status(200).json({
            message:"These are the chats",
            allMessages
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.deleteChat = async (req, res, next) =>{
    try {
        const {chatId} = req.body;
        const chat = await Chat.findById(chatId);

        if(!chat){
            return res.status(404).json({
                message:"Chat not found..!"
            })
        }
        let now = new Date();
        now = now.getSeconds();
        let then = chat.createdAt;
        then = then.getSeconds();

        if(now - then > 5*60*1000){
            return res.status(401).json({
                message:"You can;t delete a message after 5 minutes...!"
            })
        }

        await chat.delete();

        res.status(201).json({
            message:"Message deleted...!"
        })
    } catch (error) {
        next(error);
    }
}

exports.reactToMessage = async(req, res, next) =>{
    try {
        const {reactCode, messageId} = req.body;
        if(!reactCode || !messageId)
            return res.status(401).json({
                message:"Enter valid input...!"
            })
        const chat = await Chat.find({
            $and:[{reciever : req.user._id}, {_id : messageId}]
        })

        if(!chat)
            return res.status(404).json({
                message:"message not found...!"
            })
        chat.reaction = reactCode;
        await chat.save();

        res.status(201).json({
            message:"Reacted to message...!"
        })
    } catch (error) {
        next(error)
    }
}