var express = require('express')
var router = express.Router()
const Tweet = require('../models/tweets')
const Trend = require('../models/trends')
ObjectId = require('mongodb').ObjectId,


/* afficher tous les tweets */
router.get('/',(req,res)=>{
    Tweet.find().populate('user')
    .then(data=>{
        res.json({tweets : data})
    })
})

/* ajouter un tweet */
router.post('/pushTweet',(req,res)=>{
    const currentDate = Date.now()
    const trendPattern = /#([^ ]+)/gi
    const extractedTrends = req.body.message.match(trendPattern)
    const newTweetObjectIdid = new ObjectId()
    let trendIdsList = []
    let newTrends = []


    let newTweet = new Tweet({
        _id : newTweetObjectIdid,
        date : currentDate,
        message : req.body.message,
        user : req.body.userId,
        trends : []
    })

    async function extractAndAddTrendsFromTweets() {
        for (const trend of extractedTrends) {
          const TrendData = await Trend.findOne({ hashtagName: new RegExp(trend, 'i') });
          console.log(TrendData);
      
          if (TrendData) {
            trendIdsList.push(TrendData._id);
          } else {
            const newTrendObjectId = new ObjectId();
            trendIdsList.push(newTrendObjectId);
            newTrends.push({
              _id: newTrendObjectId,
              hashtagName: trend,
              creationDate: currentDate,
            });
          }
        }
      
        // wait the creation of new trends
        for (const newTrend of newTrends) {
          await Trend.create(newTrend);
        }
      
        newTweet.trends = trendIdsList;
        newTweet.save();
      }
      
      extractAndAddTrendsFromTweets();
      res.json({ result: true });
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