var mongoose = require('./mongo'); //importing connection config
const autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

//schema 
var User = new Schema(
  {
    userId: Number,
    name: String,
    phone: Number,
    email: String,
    password: String,
    state: String,
    status: String,
    createdBy : String,
    createdOn : {type: Date, default: Date.now},
    updatedBy : String,
    updatedOn : {type: Date, default: Date.now}
  }
);

User.plugin(autoIncrement.plugin,{model:'User',field:'userId',startAt:1});
module.exports = mongoose.model('User', User);