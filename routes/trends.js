require("../models/connection");
const Trend = require("../models/trends");

router.get("/:trend", (req, res) => {
  const pattern = new RegExp(req.params.trend, i);

  Tweet.find()
    .populate("trend")
    .then((data) => {
      const filteredData = data.filter((tweet) =>
        tweet.trend.some((hashtagName) => hashtagName.match(pattern))
      );
      return filteredData.then((data) => {
        if (data) {
          res.json({ result: true, tweets: data });
        } else {
          res.json({ result: false });
        }
      });
    });
});
module.exports = router;
