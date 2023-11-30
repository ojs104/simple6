const mongoose = require("mongoose");
//스키마
const postSchema = new mongoose.Schema({
    name: String,
    content: String,
    postNum: Number
}, { collection: "post" }); //이름바꾸기

const Post = mongoose.model("post", postSchema)
module.exports = { Post };