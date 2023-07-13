require("../models/connection");
var express = require('express')
var router = express.Router()
const Tweet = require("../models/tweets");

router.get("/:trend", (req, res) => {
  const pattern = new RegExp(req.params.trend, "i");

  Tweet.find()
    .populate("trend")
    .then((data) => {
      const filteredData = data.filter((tweet) =>
        tweet.trend.some((hashtagName) => pattern.test(hashtagName))
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
