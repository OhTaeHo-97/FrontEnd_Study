const express = require('express');
const app = express();

app.use((req, resp) => {
    console.log('첫번째 미들웨어 실행');
    // 사용자의 요청 header가 날라온다 -> 사용자의 정보가 정상적으로 서버로 들어오고 있다는 뜻(사용자가 어떤 식으로 요청을 보내고 있는지 날라옴)
    // dir(req.header)를 이용해서 이 안에서 특별한 요청하고 있는 사용자의 header를 뽑아낼 수 있음!
    console.dir(req.header); // 객체의 프로퍼티를 볼 수 있었음(요청 header가 나타남)
    const userAgent = req.header('User-Agent'); // user-agent라는 이름으로 날라오는 header를 문자열로 뽑아서 변수에 넣어놓은 것
    console.log(userAgent); // 사용자가 어떤 정보를 갖고 있는지가 다 나옴(이 사람의 device는 무엇인지 브라우저는 어떤 것을 쓰고 있는지 등을 알려줌)

    // 응답 작성
    resp.writeHead(200, {'content-type' : 'text/html; charset=utf-8'});
    // resp.end(); // end에 쓸 내용이 많으면 write로 쓰기도 함(문자열로 응답 데이터를 써줄 수 있음)
    resp.write('<h2>익스프레스 서버에서 응답한 메세지입니다.</h2>');
    resp.write(`<p>User-Agent 헤더값: ${userAgent}</p>`); // 처리가 끝난 데이터를 응답에 포함시켜서 보내줄 수 있음
    
    // PHP -> $_GET['userid']
    const userid = req.query.userid;
    resp.write(`<p>아이디: ${userid}</p>`);

    // 응답을 보내줌(write를 통해 body를 작성했음)
    resp.end(); // 안에 데이터를 쓸거면 그 데이터를 바로 쓰면서 응답을 해주는 것이고 write를 쓰면 end 안에 아무것도 안 담아서 보내줘도 됨(위에 다 써놨으므로)
}).listen(3000, () => {
    console.log('3000번 포트로 서버 실행중...');
});