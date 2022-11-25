const User = require("../model/UserSchema");
const cloudinary = require("cloudinary");

exports.register = async(req, res) =>{
    try {
        //  GETTING INPUTS...
        const {name, userName, password, image, about} = req.body;

        // CHECKING IF USER EXIST WITH THIS USERNAME..
        const prevUser = await User.findOne({userName});
        if(prevUser){
            return res.status(401).json({
                message:"userName already taken...!"
            })
        }

        let newCloud;
        // IF IMAGE IS GIVEN...
        if(image){
            newCloud = await cloudinary.v2.uploader.upload(image, {folder:"crudApp"});
        } /// IF NO IMAGE IS GIVEN... A DEFAULT IMAGE IS GIVEN...
        else{
            newCloud = {
                public_id:"funmedia_users/default_avatar_xlauux",
                secure_url:"https://res.cloudinary.com/dtgj7lwpa/image/upload/v1663670301/funmedia_users/default_avatar_xlauux.png"
            }
        }
        // setting joining date...
        let time = new Date(Date.now());
        const joinDate = time.getDate() + "." + time.getMonth() + "." + time.getFullYear();

        //  CREATING A NEW USER...
        const newUser = await User.create({
            name,
            userName,
            image:{
                public_id:newCloud.public_id,
                url:newCloud.secure_url
            },
            password,
            about,
            joinDate
        })

        /// CREATING TOKEN AND SAVING...
        const token = await newUser.generateToken();

        const options = {
            expires: new Date(Date.now() + 30*24*60*60*1000),
            httpOnly:true
        }

        // SUCCESS.....
        res.status(201).cookie("token", token, options).json({
            message:"account created successfully...!",
            newUser
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.login = async(req, res)=>{
    try {
        const {userName, password} = req.body;
         // Finding that user to login... ("+select" for getting the hidden password)
        const user = await User.findOne({userName}).select("+password");
        //  IF GIVEN USERNAME DOESN'T EXIST...
        if(!user){
            return res.status(401).json({
                message:"user not found...!"
            })
        }
        // MATCHING PASSWORD...
        const isCorrect = await user.matchPassword(password);

        if(!isCorrect){//   WRONG PASSWORD.....
            return res.status(401).json({
                message:"password isn't correct...!"
            })
        }
        //   GENERATING TOKEN AFTER LOGIN...
        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 30*24*60*60*1000),
            httpOnly:true
        }
        // SUCCESSSSS....
        res.status(200).cookie("token", token, options).json({
            message:"logged in...!",
            token,
            user
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.loadUser = async(req, res) =>{
    try {
        const user = await User.findById(req.user._id);  //     FINDING USER BY ID OF REQ USER...

        if(!user){
            return res.status(400).json({
                message:"please log in first...!"
            })
        }
        //  SUCCESS...
        res.status(200).json({
            message:"user fetched...!",
            user
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.logout = async(req, res) =>{
    try {
        const options = {
            expires:new Date(Date.now() + 0),
            httpOnly:true
        }

        res.status(201).cookie("token", null, options).json({
            message:"logged out...!"
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.updateUser = async (req, res) =>{
    try {
        const {name, image, about, password} = req.body;
        const user = await User.findById(req.user._id);

        if(name){
            user.name = name;
        }
        if(password){
            user.password = password;
        }
        if(about){
            user.about = about;
        }

        if(image){
            if(user.image.public_id != "funmedia_users/default_avatar_xlauux"){
                cloudinary.v2.uploader.destroy(user.image.public_id);
            }

            const newCloud = await cloudinary.v2.uploader.upload(image, {folder:"crud App"});
            user.image = {
                url:newCloud.secure_url,
                public_id:newCloud.public_id
            }
        }

        user.save();
        res.status(201).json({
            message:"account updated...!"
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.deleteUser = async (req, res) =>{
    try {
        const user = await User.findById(req.user._id).select("+password"); // getting user...
        if(!user){
            return res.status(401).json({
                message:"user not found...!"
            })
        }
        
        //  CHECKING PASSWORD
        const {password} = req.body;
        const isCorrect = await user.matchPassword(password);
        if(isCorrect == false){
            return res.status(401).json({
                message:"wrong Password...!"
            })
        }

        //  DELETING THE IMAGE FROM CLOUDINARY...
        const image = user.image; 
        await cloudinary.v2.uploader.destroy(image.public_id);

        await user.remove(); /// MONGO DB DELETION..

        const options = { //  FOR TOKEN MANAGEMENT...!!
            expires:new Date(Date.now() + 0),
            httpOnly:true
        };
        ///   SUCCESSSSS...
        res.status(201).cookie("token", null, options).json({
            message:"user deleted...!"
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.getUsers = async (req, res) =>{
    try {
        const user = await User.findById(req.user._id);

        const allUser = await User.find();

        let index = allUser.indexOf(user);
        allUser.splice(index, 1);

        allUser.sort((a, b)=>0.5 - Math.random())

        res.status(201).json({
            message:"all users fetched...!",
            users:allUser
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.findUser = async(req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(401).json({
                message:"user not found...!"
            })
        }

        res.status(201).json({
            message:"user fetched...!",
            user
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}