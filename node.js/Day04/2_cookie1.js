const express = require('express');
const cp = require('cookie-parser');

const app = express();
app.use(cp()); // cp를 express에 미들웨어로 등록한 것

// 쿠키 -> 문자열 데이터 담음, key-value 구조로 되어 있음

// 쿠키 세팅하는 작업
app.get('/setcookie', (req, resp) => {
    console.log('setcookie 호출');
    resp.cookie('member', {id: 'apple', name: '김사과', gender: '남성'}, {
        maxAge: 1000 * 60 * 3 // 3분
    }); // key값, value값
    resp.redirect('/showcookie');
});

app.get('/showcookie', (req, resp) => {
    console.log('showcookie 호출');
    resp.send(req.cookies); // 쿠키는 사용자에게 저장되니 요청 보낼 때 거기에 같이 날아옴
    resp.end(); // 만들어져있는 쿠키를 바로 응답(꺼내온 쿠키를 resp.send()로 응답하는 것)
});

app.listen(3000, () => {
    console.log("3000번 포트로 서버 실행중...");
});
//쿠키 -> naver.com으로 요청보낼 때 request header에 cookie가 포함된 채 날라옴!(이것이 local 브라우저에 저장되어 있으니 naver.com으로 요청 보낼 때 cookie를 다 보내주니 이를 받아 내가 저장한 것이 있나 확인해보는 것)