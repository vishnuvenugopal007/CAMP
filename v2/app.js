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
    image: String
})

var Campground = mongoose.model('Campground', campgroundSchema)

Campground.create(
    {
        name: 'Salmon Creek',
        image: 'https://farm3.staticflickr.com/2286/2270488741_2a1b9822a6.jpg'
    },
    {  
        name: 'Granite Hill',
        image:'https://farm6.staticflickr.com/5570/14879150454_848a44fb06.jpg'
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

// var campgrounds = [ 
//         {name: 'Salmon Creek' , image:'https://farm3.staticflickr.com/2286/2270488741_2a1b9822a6.jpg'},
//         {name: 'Granite Hill', image:'https://farm6.staticflickr.com/5570/14879150454_848a44fb06.jpg'},
//         {name: 'Mount Homer', image:'https://farm3.staticflickr.com/2839/11407596925_a0f9f4abf0.jpg'},
//         {name: 'Silver Lake', image:'https://farm8.staticflickr.com/7250/7467209450_a8df729b57.jpg'},
//         {name: 'Crater Lake', image:'https://farm9.staticflickr.com/8020/7538732802_49a42d28d2.jpg'},
//         {name: 'Salmon Creek' , image:'https://farm3.staticflickr.com/2286/2270488741_2a1b9822a6.jpg'},
//         {name: 'Granite Hill', image:'https://farm6.staticflickr.com/5570/14879150454_848a44fb06.jpg'},
//         {name: 'Mount Homer', image:'https://farm3.staticflickr.com/2839/11407596925_a0f9f4abf0.jpg'},
//         {name: 'Silver Lake', image:'https://farm8.staticflickr.com/7250/7467209450_a8df729b57.jpg'},
//         {name: 'Crater Lake', image:'https://farm9.staticflickr.com/8020/7538732802_49a42d28d2.jpg'}
// ]

app.get('/campgrounds', function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render('campgrounds', {campgrounds:allCampgrounds})
        }
    })
})

app.post('/campgrounds', function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name: name, image: image}
    //Create a new campground and save to DB
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
            condole.log(err)
        } else {
             //redirect back to campgrounds page
            res.redirect('/campgrounds')
        }
    })
   
})

app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs')
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('THE SERVER IS RUNNING!')
})
