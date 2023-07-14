const mongoose = require("mongoose");

const trendSchema = mongoose.Schema({
  hashtagName: String,
  Date: Date
});
const Trend = mongoose.model("trends", trendSchema);


module.exports = Trend;
