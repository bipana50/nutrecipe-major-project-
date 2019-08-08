var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var usercalorieSchema = new mongoose.Schema({
   calories: Number,
   date: { type: Date, default: Date.now },
   username: String
});

usercalorieSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("usercalorie", usercalorieSchema);