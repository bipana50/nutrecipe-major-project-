var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var recipe = require("./models/recipemodel");
var User = require("./models/user");
var usercalorie = require("./models/usercalorie");
var PORT = process.env.PORT || 8000;

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://colt:<password>@cluster0-nvio2.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://colt:rusty@cluster0-shard-00-00-nvio2.mongodb.net:27017,cluster0-shard-00-01-nvio2.mongodb.net:27017,cluster0-shard-00-02-nvio2.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true })
.then(() => console.log('connection success'))
.catch((err) => console.error(err));

mongoose.set('useCreateIndex', true);
var app = express();

app.use(bodyParser.urlencoded({extended:true}));

//passport configuration
app.use(require("express-session")({
    secret: "It can be anything you want",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(express.static("public"));

//Schema setup
var foodSchema = mongoose.Schema({
    name: String,
    image: String,
    calories: String,
    recipe: String
});

var food = mongoose.model("food", foodSchema);

// recipe.create({
//     name:"pizza",
//     calories: 384,
//     recipedata: "<p>Preheat grill for high heat.In a large bowl, mix the ground meat, egg, bread crumbs, evaporated milk, Worcestershire sauce, cayenne pepper, and garlic using your hands. Form the mixture into 8 hamburger patties.Lightly oil the grill grate. Grill patties 5 minutes per side, or until well done.</p>"
//     },function(err,recipemodel){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(recipemodel);
//          }
//        }); 

// food.create({
//     name:"Burger",
//     image:"https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary.jpg",  calories: "350 cal for 90 gm ",
//     calories:"350 cal for 95gm",
//     recipe: "<p>Preheat grill for high heat.In a large bowl, mix the ground meat, egg, bread crumbs, evaporated milk, Worcestershire sauce, cayenne pepper, and garlic using your hands. Form the mixture into 8 hamburger patties.Lightly oil the grill grate. Grill patties 5 minutes per side, or until well done.</p>"
// },function(err,campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(campground);
//     }
// }); 

app.get("/",function(req,res){
    res.redirect("/foods");
});
        
//Index route
app.get("/foods",function(req,res){
    //get all foodimage from databse
   // console.log(req.user);
    food.find({},function(err,allfoods){
        if(err){
            console.log(err);
        }else{
               res.render("index.ejs", {food: allfoods});
 
        }
    });
    
});

//Show route
app.get("/foods/:id",function(req, res) {
    food.findById(req.params.id,function(err,foundfood){
        if(err){
            console.log(err);
        }else{
               res.render("show.ejs", {food: foundfood});
        }
    });
});

app.get("/predict", isLoggedIn, function(req, res){ 
    res.render("detect.ejs");
});

app.get("/predictrecipe", function(req, res){
    console.log(req.query.foodtag);
    var foodtag = req.query.foodtag;
    recipe.find({name:foodtag},function(err,recipemodel){
        if(err){
            console.log(err);
        }else{
               res.render("showrecipe.ejs", { recipemodel: recipemodel});
        }
    });    
});

app.post("/addcalorie", isLoggedIn, function(req, res){
    console.log(req.user);
    console.log(typeof(req.body.calories));
    var calories = req.body.calories;
    var username = req.user.username;
    
    var newusercalorie = {calories: calories, username: username };
    usercalorie.create( newusercalorie, function(err, newlycreated){
        if(err){
            console.log(err);
            res.redirect("/predict");
        }else{
        console.log(newlycreated);
        res.redirect("/userprofile");
             }
    });
});

app.get("/userprofile", isLoggedIn, function(req, res){
 usercalorie.find({ username : req.user.username}, function(err, foundusercalorie){
  if(err){
      console.log(err);
      redirect("/predict");
  }else{
  res.render("userprofile.ejs", {usercalorie: foundusercalorie }); }
 });
});

app.get("/bmicalorie", isLoggedIn, function(req, res){
    res.render("bmicalorie.ejs");
});

//Auth Routes
app.get("/login",function(req,res){
    res.render("login.ejs");
});

app.post("/login",passport.authenticate("local",{
    successRedirect: "/userprofile",
    failureRedirect: "/login"
}), function(req,res){

});
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/foods");
});
app.get("/register",function(req,res){
    res.render("register.ejs");
});

app.post("/register",function(req,res){
    //console.log(req.body.weight);
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){ 
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/foods");
        });
    });
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(PORT, function(){
    console.log("Yelpcamp has started");
});