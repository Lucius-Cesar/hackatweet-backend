const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({

    date : Date,
    message : String,
    user : { type: mongoose.Schema.Types.ObjectId, ref:'users'},
    trend : [{ type: mongoose.Schema.Types.ObjectId, ref:'trends'}],

})

const Tweet =mongoose.model('tweets', tweetSchema);
module.exports = Tweet;