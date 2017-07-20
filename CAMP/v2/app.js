var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model('Campground', campgroundSchema)

Campground.create(
    {
        name: 'Salmon Creek',
        image: 'https://farm3.staticflickr.com/2286/2270488741_2a1b9822a6.jpg',
        description: 'A wonderful creek filled with wonderful salmon. If it is fishing season, fish your fill, but beware of bears!'
    },
    {  
        name: 'Granite Hill',
        image:'https://farm6.staticflickr.com/5570/14879150454_848a44fb06.jpg',
        description: 'A majestic hill of granite filled caves. No bathrooms, but beautiful views.'
    }, function(err, campground){
        if(err){
            console.log(err)
        } else {
            console.log('NEW CAMPGROUND CREATED')
            console.log(campground)
        }
    }
    )

app.get('/', function(req, res){
    res.render('landing')
}) 

//INDEX - Show all campgrounds
app.get('/campgrounds', function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render('index', {campgrounds:allCampgrounds})
        }
    })
})

//CREATE - Add a new campground to database
app.post('/campgrounds', function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var newCampground = {name: name, image: image, description: description}
    //Create a new campground and save to DB
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
             //redirect back to campgrounds page
            res.redirect('/campgrounds')
        }
    })
   
})

//NEW - show form to create new campground
app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs')
})

//SHOW - show more info about one campground
app.get('/campgrounds/:id', function(req, res){
    //find campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that identified campground
            res.render('show', {campground: foundCampground})
        }
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('THE SERVER IS RUNNING!')
})
