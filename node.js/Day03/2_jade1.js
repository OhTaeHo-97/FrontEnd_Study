const express = require('express');
const fs = require('fs');
const jade = require('jade');

const app = express();
const router = express.Router();

router.route('/about').post((req, resp) => {
    fs.readFile('./jade1.jade', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            const jd = jade.compile(data); // 읽어온 데이터를 jade.compile()를 통해 해석해주면 됨(해석된 결과가 데이터일 것임!)
            resp.writeHead(200, {'content-type' : 'text-html;'});
            resp.end(jd()); // jade는 함수로 써줘야 함(그것이 해석 완료된 데이터)
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