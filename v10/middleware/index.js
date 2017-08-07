var middlewareObj = {};
var Campground = require('../models/campground');
var Comment = require('../models/comment');

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //is the user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
             res.redirect('/campgrounds');
            } else {
            // does the user own the campground?
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                }   // otherwise redirect
                else {
                    res.redirect('back');
                }
            }
        });
    }//if not redirect
    else {
        res.redirect('back');
    }
};


middlewareObj.checkCommentOwnership = function(req, res, next){
    //is the user logged in? 
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
             res.redirect('back');
            } else {
            // does the user own the campground?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                }// otherwise redirect 
                else {
                    res.redirect('back');
                }
            }
        });
    }//if not redirect
    else {
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};


module.exports = middlewareObj;