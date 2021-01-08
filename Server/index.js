const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/startUpHubDB', {useNewUrlParser: true, useUnifiedTopology: true});

const Post = mongoose.model('Post', {
    tittle: String,
    content: String
  });

app.route("/posts")
    .get(function(req,res){
        Post.find({}, function (err, docs) {
            if(!err){
                res.send(docs)
            } else {
                res.send(err)
            }
        })
    }).post(function(req,res){
        const newPost = new Post({
            tittle: req.body.tittle,
            content: req.body.content
          });
          newPost.save(function(err){
            if(!err){
              res.sendStatus(201)
            }else{
              res.sendStatus(500);
            }
          });
    });



app.listen(3000, function(){
    console.log("Server Started on Port 3000.");
  });