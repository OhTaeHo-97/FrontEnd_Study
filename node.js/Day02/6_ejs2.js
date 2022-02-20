const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const router = express.Router();

app.use(bp.urlencoded({extended:false}));

router.route('/login').post((req, resp) => {
    const userinfo = {userid:req.body.userid, userpw:req.body.userpw}; // 객체로 만듬
    fs.readFile('./ejs2.ejs', 'utf-8', (err, data) => {
        if(err) {
            copnsole.log(err);
        } else {
            resp.writeHead(200, {'content-type':'text/html'});
            resp.end(ejs.render(data, userinfo)); // 두 번째 매개변수로 userinfo를 쓰게 되면 userinfo를 ejs로 보내서 거기서 쓸 수 있게 됨!
            // ejs에서 사용하고 있는 변수명을 key값으로 갖고 있는 객체를 만들어서 그것을 rendering할 때 뿌려주면 rendering할 때 그것을 사용함(그 객체에 있는 데이터를)
        }
    })

}); // 파라미터로 뭔가가 날라왔을 수도 있음

app.use('/', router);
app.all('*', (req, resp) => {
    resp.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
});
app.listen(3000 ,() => {
    console.log('3000번 포트로 서버 실행중...');
});