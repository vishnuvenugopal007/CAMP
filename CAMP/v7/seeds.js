var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "A serene campsite just minutes away from a mountain top with a front row seat to the skies."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Red and dry, but cool at night. Keep plenty candles handy to ward off coyotes."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "For the more adventurous among us, a trek down the the Canyon Floor opens up a few days of exploration in the area surrounding this site."
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
        console.log('Removed campgrounds!');
        }
        //Add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log('Added a campground!');
                    //create a comment
                       Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    
                }
            });
        });
    });
}

module.exports= seedDB;