const express = require('express');
const fs = require('fs');
const bp = require('body-parser');
const nm = require('nodemailer');

const app = express();
const router = express.Router();

app.use(bp.urlencoded({extended:false}));

// 인터넷에 localhost:3000/mail -> get 방식
// get 방식으로 mail 했을 때에는 mail.html 띄워주는 것으로 할 것이고 post로 보낼 때에는 메일 보내기를 해줄 것임
// localhost:3000/mail 을 주소창에 url을 치면 get 방식이니 그 때는 mail.html 띄워줄 것이고 해당 html에서 submit을 눌렀을 때에는 post이니 그 때는 메일 보내기를 해줄 것임
router.route('/mail').get((req, resp) => {
    fs.readFile('./mail.html', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            resp.writeHead(200, {'content-type' : 'text/html'});
            resp.end(data);
        }
    });
}); // 사용자에게 src/mail.html 이런 식으로 띄우지 않음 -> url을 감출 수 있음(짧게 만들 수 있음)(간략하게 하고 파일도 드러나지 않고 의미부여도 됨) => router를 사용하는 이유!

router.route('/mail').post((req, resp) => {
    const fromid = req.body.fromid;
    const frommail = req.body.frommail;
    const toid = req.body.toid;
    const tomail = req.body.tomail;
    const title = req.body.title;
    const content = req.body.content;

    const fromfmt = `${fromid}<${frommail}>`;
    const tofmt = `${toid}<${tomail}>`;
    
    const transport = nm.createTransport({
        service: 'gmail',
        auth: {
            user: 'dhxogh125@gmail.com',
            pass: 'dPflstkfkd12!'
        },
        host: 'smtp.mail.com',
        port: '465'
    }); // () 안에 객체로서 설정해서 넘겨주면 됨

    const mailOption = {
        from: fromfmt,
        to: tofmt,
        subject: title,
        text: content
    }; // 어떤 메일을 보낼 것인지 옵션에 대한 객체

    transport.sendMail(mailOption, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log(info);
        }
        transport.close(); // sendMail을 하고 transport를 닫아줌
    });
});


app.use('/', router);
app.all('*', (req, resp) => {
    resp.status(404).send("<h2>페이지를 찾을 수 없습니다.</h2>");
});
app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중...');
});