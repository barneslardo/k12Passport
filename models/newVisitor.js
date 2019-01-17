const mongoose = require("mongoose");
const { Schema } = mongoose;

var newVisitorSchema = new Schema({
  firstName: String,
  lastName: String,
  driversLicense: String
});

mongoose.model("NewVisitor", newVisitorSchema);
