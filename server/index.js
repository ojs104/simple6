const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { Post } = require("./Model/Post.js");
const { Counter } = require("./Model/Counter.js");

// 정적 파일 제공 및 JSON 및 URL 인코딩 처리를 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, "../client/build/")))

app.listen(port, () => {

    mongoose
        .connect(
            "mongodb+srv://kmdojs:dchs9577@cluster0.c4szev9.mongodb.net/reactBlog?retryWrites=true&w=majority"

        )
        .then(() => {
            console.log("listening --> " + port);
            console.log("mongoose --> connecting");
        })
        .catch((err) => {
            console.log(err)
        })
})

// 루트 경로에 대한 요청 처리
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})
// 모든 다른 경로에 대한 요청도 마찬가지로 index.html을 제공
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.post("/api/post/submit", (req, res) => {
    let temp = req.body
    // 넘버  추가 작업
    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogPost = new Post(temp);
            BlogPost.save()
                .then(() => {
                    Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(() => {
                        res.status(200).json({ success: true });
                    });

                })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false });
        })
});

app.post("/api/post/list", (req, res) => {
    Post.find().exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})
