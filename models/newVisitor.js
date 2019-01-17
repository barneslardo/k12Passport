const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var newVisitorSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String,
    driversLicense: String
  }
});

var NewVisitor = mongoose.model("NewVisitor", newVisitorSchema);
module.exports = NewVisitor;
