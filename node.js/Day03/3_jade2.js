const express = require('express');
const fs = require('fs');
const jade = require('jade');

const app = express();
const router = express.Router();

router.route('/userinfo').post((req, resp) => {
    fs.readFile('./jade2.jade', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            const jd = jade.compile(data);
            resp.writeHead(200, {'content-type' : 'text/html'});
            resp.end(jd({userid:'apple', username:'김사과', desc:'못생김'})); // jd() 괄호 안에 데이터를 넘겨주는 것(컴파일 했을 때, ejs처럼 필요한 데이터를 넘겨줘야 할 수도 있는데 ejs에서는 필요한 데이터를 render할 때 넘겨줬는데 이것처럼 jd에서는 괄호 안에 필요한 데이터를 넘기는 것)
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