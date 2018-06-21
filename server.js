//SETUP

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/angularapp/dist/angularapp'));

//MONGOOSE

mongoose.connect('mongodb://localhost/authors');

var AuthorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Author must have a name."],
        unique: true,
        minlength: [3, "Author name must be at least 3 characters long."]
    },
    quotes: [{
        text: {
            type: String,
            required: [true, "Quote must have text."],
            minlength: [3, "Quote must be at least 3 characters long."]
        },
        votes: {
            type: Number
        }
    }]
});

mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');

//ROUTES

app.get('/api/authors', function(req, res) {
    Author.find(function(err,result){
        if(err){
            res.json({
                message: "error",
                error: result
            });
        } else {
            res.json({
                message: "success",
                result: result 
            })
        }
    });
});

app.post('/api/authors', function(req,res) {
    console.log("req.body:");
    console.log(req.body);
    Author.create(req.body, function(err,result) {
        if(err) {
            console.log(err);
            res.json({
                message: "error",
                error: err});
        } else {
            res.json({
                message: "success",
                result: result
            })
        }
    });
});

app.get('/api/authors/:id', function(req,res){
    Author.findById(req.params.id, function(err, author){
        if(err) { res.json({message: "error", error: err}); }
        else    { res.json({message: "success", result: author }) }
    });
});

app.delete('/api/authors/:id', function(req,res) {
    Author.findByIdAndRemove(req.params.id, function(err){
        if(err) { res.json({message: "error", error: err}); } 
        else    { res.json({message: "success"}); }
    });
});

app.put('/api/authors/:id', function(req,res){
    author = new Author(req.body);
    // You can manually run validation using doc.validate(callback) the call back catches any error
    author.validate(function(err){
        if(err) {
            res.json({message: "error", error: err});
        }
        else {
            Author.findByIdAndUpdate(req.params.id, req.body, function(err){
                if(err) {
                    res.json({message: "error", error: err});
                } else {
                    res.json({message: "success"})
                }
            });
        }
     });
});
//id is passed through the route while the updated author object lives withinh req in req.body
app.put('/api/authors/:id/quote', function(req, res) {
    Author.findById(req.params.id, function(err, author){
        if(err){
            res.json({message: "error", error: "error"});
        } else {
            author.quotes.push(req.body);
            author.save(function(err,author){
                if(err){
                    res.json({message:"error", error:err});
                } else {
                    res.json({message:"success", author: author});
                }
            })
        }
    })
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angularapp/dist/angularapp/index.html"))
});

app.listen(8000,function(){
    console.log("Listening on Port 8000");
});