const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());
mongoose.connect('mongodb://localhost:27017/startUpHubDB', {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
    title: String,
    content: String
},{ timestamps: true });

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", postSchema);

app.route("/posts/:page-:limit")
  .get(function(req,res){
    const pageReq = req.params.page;
    const limitReq = req.params.limit;
    const options = {page:pageReq,limit:limitReq};

    Post.paginate({}, options, function(err,result){
      if(!err){
        res.send(result);
      }else{
        res.send(err);
      }
    })    
  });

app.route("/posts")
    .get(function(req,res){
        Post.find({}, function (err, docs) {
            if(!err){
                console.log("Data fetched");
                res.send(docs)
            } else {
        
                res.send(err)
            }
        })

    }).post(function(req,res){
        console.log(req.body);
        const newPost = new Post({
            title: req.body.tittle,
            content: req.body.content
          });
          newPost.save(function(err){
            if(!err){
                console.log("Article Saved");
                console.log(newPost);
                res.sendStatus(201)
            }else{
              res.sendStatus(500);
            }
          });
    });



app.listen(3000, function(){
    console.log("Server Started on Port 3000.");
  });