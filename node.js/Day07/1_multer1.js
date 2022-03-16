const express = require('express');
const bp = require('body-parser');
const multer = require('multer');
const path = require('path');
const static = require('serve-static');
const { read } = require('fs');

const app = express();
const router = express.Router();

app.use(bp.urlencoded({extended:false}));

// 3000번 포트로 띄우려면 기존에 있는 파일을 읽어서 그 읽은 데이터를 응답하는 식으로 view를 띄워줌으로써 3000번 포트로 띄웠음
// 이번에는 serve-static 이용
// 설정한 url로 요청하면 해당 폴더로 찾아가도록 등록
app.use("/public", static(path.join(__dirname, 'public'))); // psth.join(__dirname(현재 실행되고 있는 파일이 속해있는 폴더명), 'public') -> Day07/public 이라는 폴더일 것임
// static 함수 안에 이를 넣어줌 -> Day07/public에 접근할 수 있는 정적인 주소를 만듬(?)
// app.use("/public", static(path.join(__dirname, 'public'))); -> Day07에 있는 public이라는 폴더를 접근할 수 있게 됨!(/public을 통해서!)
app.use("/uploads", static(path.join(__dirname, 'uploads')));

// 저장 위치와 파일명에 대한 설정(detination, filename에서의 callback 함수 이용해서 설정해줌) -> 완료 후 설정대로 저장할 디렉토리 리턴
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads'); // 앞에는 에러함수, 뒤에는 파일 업로드할 경로
    },
    filename: (req, file, callback) => { // apple.png가 들어왔으면 apple_현재시간 으로 파일 이름을 할 것임
        const extension = path.extname(file.originalname); // extname -> 확장명(확장자명만 분리해서 줌)(ex. .png)
        const basename = path.basename(file.originalname, extension); // 확장자명이 무엇인지 알려주면서 basename을 사용하면 확장자명을 제외한 파일 이름이 주어짐
        callback(null, basename + "_" + Date.now() + extension); // 앞에는 에러함수, 뒤에는 업로드한 파일을 어떻게 저장할지에 대한 파일이름
    }
}); // diskStorage -> 객체를 넘겨주는데 객체는 destination(함수를 넘겨줌, 매개변수가 request, file, callback(우리가 호출하는 것이 아닌 파일 업로드할 때 자동으로 호출됨)), filename(함수를 넘겨줌, 매개변수로 request, file, callback(filename -> 업로드한 파일을 어떤 이름으로 저장할지를 이 함수를 호출해서 저장해줌)(filename을 호출해보고 그 때 정해지는 파일 이름으로 저장해주는 것))을 담고 있음
// filename이 업로드하는 파일의 이름을 정해주는 함수인데 내부에서 callback()을 호출하면서 넘기는 것이 파일이름
// filename을 왜 쓸까? -> 해당 파일이 이미 업로드되어있을 수 있으니 그러면 다른 사람이 또 이를 올릴 수 없음 -> 그래서 겹치지 않는 이름을 만들어내는 로직을 개발하는 것

// 업로드할 파일에 대한 설정(요청이 들어올 떄마다 정해놓은 위치에 정해놓은 제한대로 알아서 업로드해줄 것임)
const upload = multer({
    storage: storage, // 저장할 공간(diskStorage 호출하면 저장공간을 반환해줌), diskStorage -> 파일업로드하는 위치(폴더)를 돌려줌(저장소가 적혀있는 객체를 돌려줄 것임)
    limit: {
        files:1, // 파일은 한 개
        fileSize: 1024*1024*100 // 파일 사이즈는 어느 정도다(파일 -> 데이터의 묶음, 파일의 기본단위는 1바이트, 1024*1024*100 -> 100메가)
    }
}); // storage -> 어디다가 할 것인지, limit -> 파일에 제한을 두는 설정
// diskStorage가 실제 디렉토리를 마지막에 return함, multer를 이용해서 파일 올리는 것 설정할 때는 저장위치는 diskStorage가 return한 것!

// upload라는 객체가 파일 업로드에 대한 모든 설정을 담고 있음, upload라는 객체를 참고하면 어떻게 파일을 업로드할지 알 수 있음

router.route("/write").post(upload.array('photo', 1), (req, resp) => { // 내부로 들어오면 업로드를 하고 내부로 들어왔을 것임
    try {
        const files = req.files; // 업로드한 파일들
        console.log(req.files[0]);// 그 중 하나만 올릴 것이기 때문에 0번째 index

        let originalname = "";
        let filename = "";
        let mimetype = "";
        let size = 0;

        if(Array.isArray(files)) { // files라는 배열이 정상적으로 있다면(files에 뭔가 정상적으로 날라왔다면 true일 것임!)
            console.log(`클라이언트에서 받아온 파일 개수 : ${files.length}`);
            for(let i = 0; i < files.length; i++) {
                originalname = files[i].originalname;
                filename = files[i].filename;
                mimetype = files[i].mimetype;
                size = files[i].size;
            }
        }
        const title = req.body.title;

        resp.writeHead('200', {'content-type' : 'text/html; charset = utf-8'});
        resp.write('<h2>이미지 업로드 성공!</h2>');
        resp.write('<hr>');
        resp.write(`<p>제목 : ${title}</p>`);
        resp.write(`<p>원본 파일명 : ${originalname}</p>`);
        resp.write(`<p>현재 파일명 : ${filename}</p>`);
        resp.write(`<p>MimeType : ${mimetype}</p>`);
        resp.write(`<p>파일크기 : ${size}</p>`);
        resp.write(`<p><img src = "/uploads/${filename}" width = "200"></p>`);
    } catch(e) {
        console.log(e);
    }
}); // upload.array('photo', 1) -> 이렇게 하면 우리가 설정한 대로 업로드 됨

app.use('/', router);
app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중...');
});