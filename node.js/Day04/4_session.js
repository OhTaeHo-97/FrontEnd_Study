const express = require('express');
const session = require('express-session');
const bp = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bp.urlencoded({extended : false}));
app.use(session({
    secret : '!@#$%^&*', // 암호화 여부
    resave: false, // 정해진 때에만 session에 저장할 것이니 그 때만 저장하기 위해 false
    saveUninitialized : true // 요청이 들어왔을 때 session 저장하기 전에 uninitialized 삳태로 저장함(아무것도 저장되지 않은 것을 말함(빈 session이라고 생각하면 됨)), 우리가 session에 뭔가를 저장했으면 그럼 거기에 저장이 되는 것(서버의 공간은 낭비되지만 서버 방문 횟수에 따라 session을 다르게 주고 싶다면 이런 것을 쓸 수 있음)(아무 내용 없는 session이라는 공긴아 생길 수도 있다!(어떤 client에))
    // 실제로 session에 저장하라는 명령이 있어야지만 session이 생겨나는데 그렇지 않고 각자마다 빈 공간의 session이 생긴다!(빈 공간의 session들이 생성될 수 있으니!)
})); // session 등록, () 안에 객체로 만들 때의 옵션을 넘겨줌(session 저장소에 대한 설정이라고 보면 됨)

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
        req.session.member = {
            id : userid,
            pw : userpw
        } // session에 member라는 이름으로 이 객체를 저장하겠다!
        resp.redirect("/main");
    } else {
        resp.redirect("/login");
    }
});

app.get('/main', (req, resp) => {
    const member = req.session.member; // member에 대한 모든 정보가 담겨있는 session
    if(member) {
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
    req.session.destroy(() => {
        console.log('세션이 삭제되었습니다.');
    }); // session을 삭제, () 내부 함수를 호출하며 삭제해줌(공간을 삭제해줌)
    resp.redirect('/login');
});

app.listen(3000, () => {
    console.log("3000번 포트로 서버 실행중...");
});