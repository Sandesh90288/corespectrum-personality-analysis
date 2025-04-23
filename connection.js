const mongoose = require("mongoose");
async function connectmongodb(url) {
    try {
       await mongoose.connect(url);
       console.log("Mongodb connected")
    } catch (error) {
        console.log("error occured while connecting to mongodb",error)
    }
}
module.exports={connectmongodb};