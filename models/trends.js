const mongoose = require("mongoose");

const trendSchema = mongoose.Schema({
  hashtagName: String,
});
const Trend = mongoose.model("trends", trendSchema);
module.export = Trend;
