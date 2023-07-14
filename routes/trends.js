require("../models/connection");
var express = require('express')
var router = express.Router()
const Tweet = require("../models/tweets");
const Trend = require("../models/trends");


router.get("/", (req, res) => {
  Trend.find().then(data => res.json({trends: data}))
})

router.get("/:trend", (req, res) => {
  const pattern = new RegExp(req.params.trend, "i");

  Tweet.find().populate("trends")
    .then((data) => {
      console.log(data)
      const filteredData = data.filter((tweet) =>
        tweet.trends.some((hashtagName) => pattern.test(hashtagName))
      );
        if (filteredData.length) {
          console.log(filteredData)
          res.json({ result: true, tweets: filteredData });
        }
        else{
          res.json({result: false})
        }
      })
    })
        
module.exports = router;
