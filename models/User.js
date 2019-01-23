const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userID: String,
  userNameGoogle: Array,
  userImage: String,
  userNameOkta: String,
  emailOkta: String
});

mongoose.model("users", userSchema);
