const express = require('express')
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
const {connectDb} = require('./config/db');
const router = require('./routes/UserRoutes');
const path = require('path');

const App = express();
dotenv.config({path:"./config/config.env"});
App.use(express.json({limit:"50mb"}));
App.use(express.urlencoded({limit: "50mb"}))
App.use(cookieParser());
App.use(router);
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLODINARY_SECRETKEY
})

connectDb();

//accessing client/build/index.html
if (process.env.NODE_ENV === "production") {
    App.use(express.static(path.join(__dirname, "./client/build")));

    App.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
    });
}

App.listen(process.env.PORT, ()=>{
    console.log(`Server is working on port ${process.env.PORT}`)
});