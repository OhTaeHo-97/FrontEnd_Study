const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const router = express.Router();

app.use(bp.urlencoded({extended: false}));
router.route('/login').post((req, resp) => {
    fs.readFile('./ejs1.ejs', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            resp.writeHead(200, {'content-type':'text/html'});
            resp.end(ejs.render(data)); // data를 ejs의 형태로 렌더링(화면에 표현해주는 그런 데이터로 만들고 end로 응답을 해줘야 함!!)
            // ejs 문법 있는 곳은 ejs로 읽어줘야 하니 data를 ejs.render를 통해 데이터를 바꿔준 것을 써줘야 함!(ejs로 해석해서 써줘야 함!)
            // 읽어온 data를 ejs.render()를 통해 ejs로 해석하면서 ejs로 쓴 문법들이 html로 변형이 일어날 것임 -> 변형된 데이터를 응답으로 써주는 것!
        }
    });
});

app.use('/', router);
app.all('*', (req, resp) => {
    resp.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
});
app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중...');
});