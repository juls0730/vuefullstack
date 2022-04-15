const mongoose = require("mongoose");
const blacklistedtoken = mongoose.model(
  "blacklistedtoken",
  new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
  })
);
module.exports = blacklistedtoken;
