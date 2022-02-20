const express = require('express');
const bp = require('body-parser'); // express 설치하는 순간 같이 설치됨
const app = express();

// body-parser도 하나의 미들웨어이니 등록해줘야 함(들어온 요청 파라미터를 처리하는 미들웨어임)
app.use(bp.urlencoded({extended:false})); // body-parser 말고 같은 역할을 하는 다른 객체가 있어 extended:false 안써주면 둘이 충돌남(객체간의 충돌을 막아주는 설정)

app.use((req, resp) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    // POST 방식으로 보내게 되면 body에 감싸서 보냄, 그래서 바로 꺼낼 수 없음

    console.log(`userid : ${userid} / userpw : ${userpw}`);

    resp.writeHead(200, {'content-type' : 'text/html; charset=utf-8'});
    resp.write('<h2>익슬프레스 서버에서 응답한 메세지입니다.</h2>');
    resp.write(`<p>userid : ${userid}</p>`);
    resp.write(`<p>userpw : ${userpw}</p>`);
    resp.end();
}).listen(3000, () => {
    console.log('3000번 포트로 서버 실행중...');
});