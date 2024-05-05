const mongoose = require('mongoose');


const dbconnection = () => {
    mongoose.connect(process.env.URL).then(() => {
        console.log("Database connected successfully");
    });
}

module.exports = dbconnection;