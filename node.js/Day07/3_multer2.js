const express = require('express');
const bp = require('body-parser');
const multer = require('multer');
const path = require('path');
const static = require('serve-static');
const logger = require('morgan'); // 로그를 찍어주는 라이브러리
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const router = express.Router();

app.use(bp.urlencoded({extended:false}));
// 요청이 들어왔을 때 폴더로 인식하도록 static 등록
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

// log 대신 찍어줄 morgan을 사용함
app.use(logger('dev')); // 어떤 것을 찍을 것인지 형식을 등록(dev -> 개발용)

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads'); // 앞에는 에러 처리, 뒤에는 저장할 폴더 경로
    },
    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        callback(null, basename + "_" + Date.now() + extension);
    }
});

const upload = multer({
    storage: storage, 
    limit: {
        files: 1,
        fileSize: 1024 * 1024 * 100
    }
});

router.route('/mail').post(upload.array('photo', 1), (req, resp) => {
    try {
        const files = req.files;
        let originalname = '';
        let filename = '';
        let mimetype = '';
        let size = 0;

        if(Array.isArray(files)) {
            console.log(`클라이언트에서 받아온 파일 개수 : ${files.length}`);
            for(let i = 0; i < files.length; i++) {
                let file = files[i];

                originalname = file.originalname;
                filename = file.filename;
                mimetype = file.mimetype;
                size = file.size;
            } // 파일 여러 개 올렸다면 여기서 DB처리 필요(파일이 업로드 됐다는 것은 서버에 저장됐고 그 파일을 나중에도 쓸 것이기 때문에 파일을 우리가 업로드했다면 그 업로드된 파일 정보들을 DB에 저장해야 함)
            // 파일을 여러 개 올렸다면 DB 처리 해줘야 하는데 우리는 나중에 쓰려는 의도가 아니기 때문에 DB 처리를 해주지 않고 있음
        }
        fs.readFile('uploads/' + filename, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                const toname = req.body.toname;
                const tomail = req.body.tomail;
                const title = req.body.title;
                const content = req.body.content;

                const fmtfrom = `오태호<dhxogh125@gmail.com>`; // 보내는 사람의 이메일
                const fmtto = `${toname}<${tomail}>`; // 받을 사람의 이메일

                const tp = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'dhxogh125@gmail.com',
                        pass: 'dPflstkfkd12!'
                    },
                    host: 'smtp.mail.com',
                    port: '465'
                });

                const mailOption = {
                    from: fmtfrom,
                    to: fmtto,
                    subject: title,
                    text: content,
                    attachments: [
                        {
                            filename: originalname,
                            // path: // 전송하려는 파일이 view단에서 받아서 업로드하고 그것을 보내주는 것 -> 경로를 찾으려면 찾을 수는 있음, 그러나 readFile로 이미 그 파일의 데이터를 읽어왔음, 읽은 데이터가 readFile에서 함수의 매개변수인 data에 담겨있음, 그래서 path 대신 내용 자체인 content를 이용
                            content: data // 메일 보낼 때 첨부파일을 그 데이터로 만들어서 보내줄 수 있음!(path로 쓰게 되면 그 경로로 찾아가서 그 파일을 읽어서 데이터화시키고 그 데이터로 첨부파일을 보냄, 그런데 이미 우리는 데이터를 읽었으니 그 데이터를 보내주면 됨(그것이 그 파일 경로에 있는 정보니까))
                        }
                    ]
                }
                tp.sendMail(mailOption, (err, info) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(info);
                        resp.writeHead(200, {'content-type' : 'text/html;charset=utf-8'});
                        resp.write('<h2>메일 보내기 성공</h2>');
                        resp.write('<hr>');
                        resp.write(`<p>제목 : ${title}</p>`);
                        resp.write(`<p>내용 : ${content}</p>`);
                        resp.write(`<p>현재 파일명 : ${filename}</p>`);
                        resp.write(`<p><img src = '/uploads/${filename}' width = '200'></p>`);
                        resp.end();
                    }
                    tp.close();
                });
            }
        }); // upload 파일에 있는 filename 이름의 파일을 읽고 정상적으로 읽었다면 data에 해당 객체가 있을 것임
    } catch {
        console.log(e);
    }
});

app.use('/', router);
app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중...');
});