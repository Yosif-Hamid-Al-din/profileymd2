const mongoose = require('mongoose');
const Schema = mongoose.Schema
const profileSchema = new Schema({
    name:String,
    phone:Number,
    order:String,
    typeorder:String,
})
const profile = mongoose.model('profile',profileSchema )
module.exports = profile