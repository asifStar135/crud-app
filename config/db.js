const mongoose = require('mongoose');

exports.connectDb = async ()=>{
    try {
        let {connection} = await mongoose.connect(process.env.db);
        console.log("Host connected -> " + connection.host);
    } catch (error) {
        console.log(error);
    }
}