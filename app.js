var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// {
// 	name: "Lusaka Playground", 
// 	image: "https://live.staticflickr.com/5491/14286631065_537cfebe96_c.jpg",
// 	description: "awsome mountain hill"
	
// }, function(err, campground){
// 	if(err){
// 			console.log(err);
// 	}else{
// 		console.log(campground)
// 	}
// });	

// var campgrounds = [
// 	{name: "Lafia Field", image: "https://live.staticflickr.com/834/43084000981_e2a602099d_c.jpg"},
// 	{name: "Lusaka Playground", image: "https://live.staticflickr.com/5491/14286631065_537cfebe96_c.jpg"},
// 	{name: "Normandy Mus", image: "https://live.staticflickr.com/4570/38155259614_425ded4e03_c.jpg"},
// 	{name: "Lafia Field", image: "https://live.staticflickr.com/834/43084000981_e2a602099d_c.jpg"},
// 	{name: "Lusaka Playground", image: "https://live.staticflickr.com/5491/14286631065_537cfebe96_c.jpg"},
// 	{name: "Normandy Mus", image: "https://live.staticflickr.com/4570/38155259614_425ded4e03_c.jpg"}
// 	]

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err)
		}else{
			res.render("index", {campgrounds:campgrounds});
		}
	})
	// res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var des = req.body.description;
	var newCampground = {name: name, image: image, description:des};
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show", {campground: foundCampground});
		}
	});

});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});