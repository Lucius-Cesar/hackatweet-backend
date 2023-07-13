const mongoose = require("mongoose")
const userSchema = mongoose.schema({
    username: String,
    firstname: String,
    password: String,
    token: String
})

const User = mongoose.model("users", userSchema)
module.export = User;