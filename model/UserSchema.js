const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

//   ALL PROPERTY AND CINDITIONS OF THE USER MODEL/SCHEMA...

const User = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:[true, "this userName is already taken..!"]
    },
    password:{
        type:String,
        required:true,
        select:false,
        minLength:[6, "password length should be more than 5 character"],
    },
    image:{
        url:String,
        public_id:String
    },
    about:String,
    joinDate:{
        type:String,
        required:true
    }
})

// GENERATE A TOKEN WHILE LOGIN...
User.methods.generateToken = function (){
    return jwt.sign({_id:this._id}, process.env.SECRET_KEY);
}

// HASH THE PASSWORD WHENEVER CHANGED...
User.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// MATCH THE ENTERED PASSWORD WITH THE ENTERED...
User.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", User);