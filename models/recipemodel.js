var mongoose =  require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var recipeSchema = mongoose.Schema({
    name: String,
    calories: Number,
    recipedata: String,
    
  });
  recipeSchema.plugin(passportLocalMongoose);

    var recipe = mongoose.model("recipe", recipeSchema);

module.exports = recipe;