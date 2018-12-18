const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var studentSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  }
});

var Student = mongoose.model("Student", studentSchema);
module.exports = Student;
