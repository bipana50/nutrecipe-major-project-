var mongoose =  require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var recipeSchema = mongoose.Schema({
    name: String,
    calories: Number,
    recipedata: String,
    
  });
  recipeSchema.plugin(passportLocalMongoose);

    var recipe = mongoose.model("recipe", recipeSchema);
   
    // recipe.create({
    // name:"pizza",
    // calories: 420,
    // recipedata:"<p>1. Brush a large bowl with olive oil. Shape the pizza dough into a ball, add it to the bowl and turn to coat with the oil. Cover tightly with plastic wrap and set aside in a warm place, 30 to 40 minutes. </p><p>2. Position racks in the upper third and middle of the oven. Place a pizza stone or inverted baking sheet on the top rack and preheat the oven to 425 degrees F for at least 30 minutes.</p><p>3. Meanwhile, lay out a sheet of parchment paper and brush with olive oil. Transfer the ball of dough to the parchment and roll it out into a 10-inch round, stretching it with your hands as needed. Lightly brush the dough with olive oil, cover with another piece of parchment and set aside to let rise slightly, about 30 minutes. </p><p>4. While the dough rises, mix 2 tablespoons barbecue sauce and 1 teaspoon olive oil in a small bowl. Put the chicken in a baking dish, season with salt and pepper and brush with the barbecue sauce mixture. Bake on the middle oven rack until cooked through, about 20 minutes. Let cool, then cut into 1/2-inch cubes. </p><p>5. Uncover the dough and spread with the remaining 1/3 cup barbecue sauce, leaving a 3/4-inch border. Top with the chicken, gouda, mozzarella and red onion. Slide the pizza (on the parchment) onto a pizza peel or another inverted baking sheet, then slide onto the hot stone or baking sheet; bake until the cheese melts and the crust is golden, 20 to 25 minutes. Sprinkle with cilantro.</p>"
    // },function(err,recipemodel){
    // if(err){
    //     console.log(err);
    // }else{
    //     console.log(recipemodel);
    //      }
    //    }); 

module.exports = recipe;