
## client

npx create-react-app .   
npm install react-bootstrap bootstrap   
npm install react-router-dom
npm i axios


npm run build
npm install http-proxy-middleware

<!-- emotion 설치 -->
npm install @emotion/css
npm install @emotion/react
npm install @emotion/styled

## server
npm init -y   

npm install express --save   
npm install nodemon --save   
npm install path --save  
npm install mongoose --

## 첫 세팅

## index.js 
const express = require("express");
const path = require("path");
const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build/")))

app.listen(port, () => {
    console.log("listening --> " + port);

})
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname), "../client/build/index.html");
})
## 몽고db 연결
app.listen(port, () => {
    mongoose
        .connect('mongodb+srv://kmdojs:dchs9577@cluster0.c4szev9.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log("listening --> " + port);
            console.log("connect --> mongoDB...");
        })
        .catch((err) => {
            console.log(err)
        })
});
## 
1. components 폴더생성 -> Header.js, Home.js, List.js, Upload.js

2. App.js import 하기

## bootstrap 작업
1. APP.JS
  <BrowserRouter>
    <App />
  </BrowserRouter>

2. Headr.js
 Bootstrap 작업하기

3. index.html Link 걸기
```js
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous" />
```

## 서버에서 client로 보내기

1. App.js에서 
```js
app.post("/api/test", (req, res) => {
    console.log(req);
    res.status(200).json({ sucess: true, text: "안녕하세유~" });
})
```

2. List.js에서 usestate 만들기.
```js
 const [text, setText] = useState("");

 const List = () => {

    const [text, setText] = useState("");
    
    useEffect(() => {
        axios.post('/api/test')
            .then(response => {

                console.log(response);
                alert('요청 성공');
                setText(response.data.text)
            })
            .catch((err) => {
                console.error(err);
                alert('요청 실패');
            });
    }, []);

    return (
        <div>
            <p>{text}</p>
        </div>
    )
};
```

## Model -> Post.js 

```js

const mongoose = require("mongoose");
//스키마
const postSchema = new mongoose.Schema({
    title: String,
    content: String
}, { collection: "Banana" }); //이름바꾸기

const Post = mongoose.model("post", postSchema)
module.exports = { Post };
```

## List.js 
```js
1.index.js:

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

2. List.js : 


```

## 첫번째 글 수정하려면?

- id값을 만들어줘야 됨

## err

- 504 error 원인:

- 해결: db insert document 만들 때 입력 잘 해야 됨 .
        name: String,
        postNum: Number
## proxy-middleware
 - 다른 서버로의 HTTP 요청을 중개하고 프록시하는 데 사용되는 미들웨어입니다. 주로 개발 중에 로컬 개발 서버에서 API 서버와 같은 백엔드 서버로의 요청을 프록시할 때 유용하게 사용됩니다.
 일반적으로, 프론트엔드와 백엔드 서버가 각각 다른 포트에서 실행 중일 때, CORS(Cross-Origin Resource Sharing) 문제로 인해 브라우저에서 직접 요청을 보낼 경우 문제가 발생할 수 있습니다. 이런 경우에 proxy-middleware를 사용하여 프론트엔드 개발 서버에서 백엔드 서버로의 요청을 중개할 수 있습니다. 
 proxy-middleware를 사용하면 프록시 설정을 통해 특정 경로로 들어오는 요청을 다른 서버로 전달할 수 있습니다. 예를 들어, 개발 중인 프론트엔드 애플리케이션에서 /api 경로로 들어오는 요청을 백엔드 서버로 프록시하고 싶은 경우에 사용할 수 있습니다.
 간단한 예시로, Express.js를 사용하여 프록시 설정을 하는 코드는 다음과 같을 수 있습니다:

`const { createProxyMiddleware } = require('http-proxy-middleware');`

`module.exports = function (app) {
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'http://localhost:5050',
                changeOrigin: true,
            })
        );
    };`
    
## axios
` axios: HTTP 클라이언트 라이브러리로, 서버에 HTTP 요청을 보내고 응답을 받아오는 역할을 합니다. 이 코드에서는 post 메서드를 사용하여 서버의 'api/test' 엔드포인트에 POST 요청을 보냅니다. 서버로부터 받은 응답 데이터는 response.data에서 가져와서 setText를 사용하여 상태를 업데이트합니다.`

1. axios는 클라이언트와 서버 간의 HTTP 통신을 도와주는 라이브러리입니다.
2. 이 코드에서는 axios를 사용하여 서버에 POST 요청을 보내고, 서버에서 받은 응답을 처리하여 화면에 표시하는 역할을 합니다.
 서버에 데이터를 보내거나 서버로부터 데이터를 받아올 때 사용됩니다. 이를 통해 비동기적인 데이터 통신을 간편하게 처리할 수 있습니다.

##
app.use(express.static(path.join(__dirname, "../client/build/")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

## Upload.js
컴포넌트 구성:

Upload: 글을 작성하고 서버에 전송하는 주요 컴포넌트입니다.
UploadDiv, UploadTitle, UploadForm, UploadButton: 스타일을 담당하는 컴포넌트입니다. 스타일드 컴포넌트(styled-components 또는 emotion과 같은 라이브러리)로 작성된 것으로 추측됩니다.

상태 관리:

useState 훅을 사용하여 title과 content라는 두 가지 상태를 관리합니다. 이들은 각각 글의 제목과 내용을 나타냅니다.

이벤트 핸들러:

onSubmit 함수: 글 작성이 완료되면 호출되는 함수로, 폼의 제출 이벤트를 처리합니다.

e.preventDefault(): 폼의 기본 동작을 방지하여 페이지 새로고침을 막습니다.
제목 또는 내용이 비어있을 경우 알림을 띄웁니다.
글 작성이 성공하면 서버에 해당 데이터를 전송하고, 성공 여부에 따라 알림을 표시합니다.

서버 통신:

axios.post("/api/post/submit", body): Axios를 사용하여 서버에 POST 요청을 보냅니다.
/api/post/submit: 서버에서 해당 엔드포인트에 POST 요청을 처리할 수 있는 API 경로입니다.

body: 글의 제목과 내용을 담고 있는 객체로, 서버에서 이를 활용하여 데이터를 처리합니다.
입력 요소와 이벤트 핸들러 연결:

input 및 textarea 요소의 value 속성과 onChange 이벤트 핸들러를 활용하여 사용자의 입력을 받습니다.
onChange 이벤트 핸들러에서 상태를 업데이트하고, 이를 통해 입력 요소의 값이 동적으로 변경됩니다.

알림:
서버로부터의 응답에 따라 알림 메시지를 띄웁니다. 글 작성이 성공하면 "글 작성이 완료되었습니다."라는 알림이, 실패하면 "글 작성이 실패하였습니다."라는 알림이 표시됩니다.
이 컴포넌트는 사용자가 입력한 글의 제목과 내용을 서버로 전송하여 글을 작성하는 역할을 수행하고, 그 과정에서 사용자에게 알림을 제공합니다.


