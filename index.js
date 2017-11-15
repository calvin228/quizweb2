var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var http = express();
const Member = require("./models/member")
const methodOverride = require("method-override");

http.set('views','views');
http.set('view engine','ejs');

mongoose.connect("mongodb://localhost/quiz");
mongoose.connection.once('open', () => {
  console.log('Connection to database success');
}).on('error', (err) => {
  console.log('Connection error');
})

http.use(bodyParser.urlencoded({extended : false}))
http.use(bodyParser.json())
http.use(methodOverride("_method"));

http.get("/member", (req,res) => {
  Member.find({}, (err, member) => {
    if (err) {
      console.log(err)
    } else {
      res.render("index", {member: member});
    }
  })
})
http.post("/member", (req,res) => {
  if (req.body.nama && req.body.kelas && req.body.jam) {
    var memberData = {nama: req.body.nama, kelas: req.body.kelas, jamkuliah: req.body.jam}
    Member.create({nama : memberData.nama, kelas: memberData.kelas, jamkuliah: memberData.jamkuliah}, (err, member) => {
      if (err) {
        console.log(err)
      } else {
        console.log("Member registered");
        res.redirect("/member");
      }
    })
  }

})

http.post("/delete/:nama", (req,res) => {})

http.listen(3000, () => {
  console.log("Listening to 3000...");
})
