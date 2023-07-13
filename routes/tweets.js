var express = require('express')
var router = express.Router();
const Tweet = require('../models/tweets');

/* afficher tous les tweets */
router.get('/allTweets',(req,res)=>{
    Tweet.find().populate('user')
    .then(data=>{
        res.json({tweets : data})
    })
})

/* ajouter un tweet */
router.post('/pushTweet',(req,res)=>{
    const newTweet = new Tweet({
        message : req.body.message
    })
    newTweet.save().then((data)=>{
        res.json({newTweet : data})
    })
})

/* supprimer un tweet */

router.delete('/deleteTweet', (req,res)=>{
    Tweet.deleteOne({ id : req.body.tweetId}).then((data)=>{
        if(data){
            res.json({delete : true})
        }
        else{
            res.json({delete : false})
        }
    })
})