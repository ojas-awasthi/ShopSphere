const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "config", "config.env") });
function connectDB(){
    mongoose.set("strictQuery", false); 
  
    mongoose   
        .connect(process.env.DB_LINK) 
        .then(function () {
            console.log("DB_connected");
        })
        .catch(function (err) {
            console.log("error", err);
        })
}

module.exports = connectDB