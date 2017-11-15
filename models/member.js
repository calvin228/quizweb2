const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

var memberSchema = new Schema({
  nama: String,
  kelas: String,
  jamkuliah: String
})


// userSchema.plugin(passportLocalMongoose);
var member = mongoose.model('member', memberSchema);


module.exports = member;
