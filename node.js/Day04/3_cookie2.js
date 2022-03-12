const express = require('express');
const cp = require('cookie-parser');
const bp = require('body-parser');
const fs = require('fs');
const e = require('express');

const app = express();
app.use(bp.urlencoded({extended:false}));
app.use(cp('!@#$%^&*')); // () 안의 값을 기반으로 쿠키가 만들어짐!

app.get('/login', (req, resp) => {
    fs.readFile('./login.html', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            resp.writeHead(200, {'content-type' : 'text/html'});
            resp.end(data);
        }
    });
});

app.post('/login', (req, resp) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    if(userid == 'admin' && userpw == '1234') {
        // 쿠키를 만들 것임
        const ex = new Date(Date.now()+(1000*60*60*24)); // 만료시간(쿠키를 이만큼 유지시킬 것이라는 뜻, 만료시간이 끝나면 삭제됨)
        resp.cookie('userid', userid, {
            expires: ex,
            signed: true // 암호화에 대한 것
        }) // 로그인했다는 것을 cookie에 나타내려고 함
        resp.redirect("/main");
    } else {
        resp.redirect("/login");
    }
});

app.get('/main', (req, resp) => {
    const userid = req.signedCookies.userid; // 암호화된 것은 꺼낼 때로 암호화된 것에서 꺼내야 하므로 signedCookies를 이용
    if(userid) {
        fs.readFile('./main.html', 'utf-8', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                resp.writeHead(200, {'content-type' : 'text/html'});
                resp.end(data);
            }
        });
    } else {
        resp.redirect('/login');
    }
});

app.get('/logout', (req, resp) => {
    // 쿠키를 지워줘야 함
    resp.clearCookie('userid'); // userid라는 쿠키를 지운다!
    resp.redirect('/login');
});

app.listen(3000, () => {
    console.log("3000번 포트로 서버 실행중...");
});