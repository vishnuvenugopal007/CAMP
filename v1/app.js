var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('landing')
}) 

var campgrounds = [ 
        {name: 'Salmon Creek' , image:'https://farm3.staticflickr.com/2286/2270488741_2a1b9822a6.jpg'},
        {name: 'Granite Hill', image:'https://farm6.staticflickr.com/5570/14879150454_848a44fb06.jpg'},
        {name: 'Mount Homer', image:'https://farm3.staticflickr.com/2839/11407596925_a0f9f4abf0.jpg'},
        {name: 'Silent Silver Forest', image:'https://farm4.staticflickr.com/3069/2942421645_38b206298a.jpg'},
        {name: 'Crater Lake', image:'https://farm9.staticflickr.com/8020/7538732802_49a42d28d2.jpg'}
]

app.get('/campgrounds', function(req, res){

    
     res.render('campgrounds', {campgrounds:campgrounds})
})

app.post('/campgrounds', function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground)
    //redirect back to campgrounds page
    res.redirect('/campgrounds')
})

app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs')
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('THE SERVER IS RUNNING!')
})
