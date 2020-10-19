var express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var addPost = require("../Schema/createPost_schema");
const { ensureAuthenticated } = require('./auth');
var mongoDB = 'mongodb://127.0.0.1:27017/admin';
var jwt = require('jsonwebtoken');
var multiparty = require('multiparty');
var multer  = require('multer');


mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;


//Set up default mongoose connection


router.get('/',verifyToken, function(req, res, next) {
  
  var bearerHeader= req.headers["authorization"];
  
  jwt.verify(bearerHeader,'secret',(err,authData)=>{
    if(err){
     res.send(false);
     return;
    }
    else{

      db.collection("postschemas").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
      });
    }
  })

        
});
function verifyToken(req,res,next){
  
 const bearerHeader = req.headers["authorization"];
 if(typeof bearerHeader !== 'undefined')
 {
   const bearer = bearerHeader.split(' ');
   const bearerToken = bearer[1];
   req.token = bearerToken;
   next();
 }
 else{
  console.log("in error");
  res.sendStatus(403);
 }
}
var pathtoImage;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'blog-website/src/upload/')
  },
  filename: function (req, file, cb) {
    pathtoImage = file.fieldname + '-' + Date.now()
    cb(null, pathtoImage)
  }
});
var upload = multer({ storage: storage })

router.post('/',verifyToken,upload.any(), function (req, res) {
  var token= req.headers["authorization"];
  jwt.verify(token,'secret',(err,authData)=>{
    if(err){
     res.sendStatus(404);
     return;
    }
    else{
      var records = new addPost({title: req.body.title , body: req.body.body, imagePath:pathtoImage});
        records.save(function(err){
           if(err){console.log(err);}
           else{console.log("success")}
         })
         res.send(true);
         return;
      
    }
  });
  

        
  /*  MongoClient.connect('mongodb://localhost:27017',{useUnifiedTopology: true}, function (err, client) {
  if (err) throw err

 var db = client.db('admin')
var checkUser = db.collection('user').find( { "Email": "muneebahmad121@gmail.com" } );
console.log(checkUser);*/
/*
db.collection('user').insertOne(myobj,function (err, result) {
 if (err) throw err

 console.log(result)
})

})*/    
});
 router.delete('/', (req, res) => {
  
  var token= req.headers["authorization"];

  jwt.verify(token,'secret',(err,authData)=>{
    if(err){
     res.sendStatus(404);
     return;
    }
    else{
      db.collection("postschemas").deleteOne({"title":req.query.id});
      res.send(true);
      return ;
    }
 
 });
});
router.put('/',(req,res)=>{
  if(req.body.user === "ali@gmail.com"){
    db.collection("postschemas").updateOne({"title":req.body.title},
    {$set:{
      title:req.body.postData.title,
      body:req.body.postData.body,
    }});
    res.send(true);
    return;

  }
  else{
    res.send(false);
  }
  /*
  */
})

module.exports = router;