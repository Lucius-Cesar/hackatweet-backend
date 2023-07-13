const mongoose = require("mongoose")
const userSchema = mongoose.schema({
    username: String,
    prenom: String,
    password: String,
    token: String
})

const User = mongoose.model("users", userSchema)
module.export = User;