const mongoose = require("mongoose");

const connectToDB = async () =>
    mongoose.connect("mongodb://localhost:27017/mySecondDB", {
        useNewUrlParser: true,
    });

module.exports = connectToDB;