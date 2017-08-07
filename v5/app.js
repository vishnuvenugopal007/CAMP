var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp_v4');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
//serving public directory
app.use(express.static(__dirname + "/public"));
seedDB();

app.get('/', function(req, res){
    res.render('landing');
}); 

//INDEX - Show all campgrounds
app.get('/campgrounds', function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('index', {campgrounds:allCampgrounds});
        }
    });
});

//CREATE - Add a new campground to database
app.post('/campgrounds', function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    //Create a new campground and save to DB
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
             //redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

//NEW - show form to create new campground
app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});

//SHOW - show more info about one campground
app.get('/campgrounds/:id', function(req, res){
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);  
            //render show template with that identified campground
            res.render('show', {campground: foundCampground});
        }
    });
});

// =================
// COMMENTS ROUTES
// =================

app.get("/campgrgounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds' + campground._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('THE SERVER IS RUNNING!');
});