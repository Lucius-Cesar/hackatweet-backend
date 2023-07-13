var express = require('express')
var router = express.Router()
const Tweet = require('../models/tweets')
const Trend = require('../models/trends')

/* afficher tous les tweets */
router.get('/allTweets',(req,res)=>{
    Tweet.find().populate('user')
    .then(data=>{
        res.json({tweets : data})
    })
})

/* ajouter un tweet */
router.post('/pushTweet',(req,res)=>{
    const currentDate = Date.now()
    const trendPattern = /#([^ ]+)/gi
    const extractedTrend = req.body.message.match(trendPattern)
    let trendsId = []
    for(let trend of extractedTrend){
        Trend.findOne({ hashtagName : new RegExp (trend,'i') })
         .then(data=>{
           
            if(data){
                console.log(data)
                trendsId.push(String(data._id))
                console.log(trendsId)
            }
            
            else{
                newTrend = new Trend({
                    hashtagName : trend
                })
                newTrend.save().then(data =>
                    trendsId.push(String(data._id)))
            }
         })
       
       
    }
    console.log(trendsId)
    const newTweet = new Tweet({
        date : currentDate,
        message : req.body.message,
        user : req.body.userId,
        trend : trendsId
    })
    newTweet.save().then((data)=>{
        res.json({newTweet : data})
    })
})

/* supprimer un tweet */

router.delete('/deleteTweet', (req,res)=>{
    Tweet.deleteOne({ _id : req.body.tweetId}).then((data)=>{
        if(data){
            res.json({delete : true})
        }
        else{
            res.json({delete : false})
        }
    })
})

module.exports = router;