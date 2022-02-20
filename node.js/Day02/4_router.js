const express = require('express');
const bp = require('body-parser');
const app = express();
const router = express.Router();

app.use(bp.urlencoded({extended:false}));
router.route('/member/login').post((req, resp) => {
    console.log('/member/login 호출!');
}); // member/login이라는 url로 post 방식 요청이 들어오면 post 안에 함수가 호출됨
router.route('/member/regist').post((req, resp) => {
    console.log('/member/regist 호출!');
});
// 서버는 하나로 두고 뒤에 있는 url을 통해 나눠줄 수 있다!
router.route('/about/detail').get((req, resp) => {
    console.log('/about/detail 호출');
});
// router 완성됨 -> 그 router를 서버에 등록하는 것
app.use('/', router); // 최상위 root로 요청이 들어왔으면 router로 가라는 뜻!
app.all('*', (req, resp) => {
    resp.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
}); // app에 등록되어 있는 모든 것애는 이런 미들웨어를 등록해달라는 뜻!
app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중...');
});