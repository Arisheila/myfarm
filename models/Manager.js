const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

const ManagerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique:true,
    requred: true,
  },

  password: {
    type: String,
  },
});

// Export Model
ManagerSchema.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model("Manager", ManagerSchema);