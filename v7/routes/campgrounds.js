var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

//INDEX - Show all campgrounds
router.get('/', function(req, res){
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
router.post('/', function(req, res){
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
router.get('/new', function(req, res){
    res.render('new.ejs');
});

//SHOW - show more info about one campground
router.get('/:id', function(req, res){
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

module.exports = router;