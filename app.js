const express = require('express')
const app = express()
const port = process.env.PORT || 1000
const mongoose = require('mongoose');
app.use(express.urlencoded({extended: true}))
const profile = require('./models/Schema')
app.set('view engine', 'ejs')
app.use(express.static('public'))
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
// auto refrish
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
require('dotenv').config()
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});



app.get('/', (req, res) => {
  profile.find()
  .then((result) => {
    res.render("index", {arr: result})
  }).catch((err) => {
    console.log(err)
  })
  
})









app.post("/", (req, res) => {
  const order = new profile(req.body);
  order
    .save()
    .then( () => {
      res.redirect("/");
    })
    .catch( err => {
      console.log(err);
    });
});




mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
  });
})
.catch((err) => {console.log(err)});

