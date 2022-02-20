const express = require('express');
const app = express();

// 요청이 들어오면 use 안에 있는 함수가 호출됨
// 호출되면서 요청과 응답을 받아오고 그것을 md1이라는 함수에 넘겨줌
// 그것들이 그대로 날라와서 담기고 내부를 수행할 것임(md1) -> 요청이 날라왔을 때 담긴 req, resp를 통해 redirect를 함

app.use((req, resp) => {
    // console.log('첫번째 미들웨어 실행!');
    md1(req, resp);
}).listen(3000, () => {
    console.log('3000번 포트로 서버 실행중...');
});

function md1(req, resp) {
    console.log('첫번째 미들웨어 실행!');
    resp.redirect('https://www.naver.com'); // 응답을 통해서 페이지를 이동시킬 때 사용하는 함수
    // db 연동
}
// db에서는 db용 언어가 있을 것이니 db에 js를 연동하는 역할이 필요한데 그것을 위 함수에 작성할 것임(함수로)
// 이 기능을 갖고 있는 함수가 하나의 미들웨어가 되는 것(가운데에서 연동 역할을 해주니)