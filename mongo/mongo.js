var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var studentSchema = new Schema({
  firstName: String,
  lastName: String,
  parent1FirstName: String,
  parent1LastName: String,
  parent2FirstName: String,
  parent2LastName: String,
  age: Number,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  meta: {
    tardies: Number,
    absences: Number
  }
});

module.exports = studentSchema;
