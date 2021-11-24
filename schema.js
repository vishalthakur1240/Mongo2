const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
    fName: String,
    sName: String,
    phNumber: Number
});

const peopleModel = mongoose.model("People Database", peopleSchema);

module.exports = peopleModel;