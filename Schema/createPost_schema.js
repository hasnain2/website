var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var createPost =  new Schema({
    title: String,
    body: String,
    imagePath:String,
    // other fields...
});

var postSchema = mongoose.model('postSchema', createPost);
module.exports = postSchema;
