const express = require('express');
const fs = require('fs');
const bp = require('body-parser');

const app = express();
app.engine('html', require('ejs').renderFile); // ejs로 이용해서 html로 해석하도록 기본적으로 설정을 해놓는 것
// renderFile을 이용하게 되면 기본적으로 directory 중 views라는 directory에서 ejs 파일을 찾고 그것으로 렌더링을 해줌!(~.ejs 이렇게 사용하게 되면 우리가 렌덜이해서 text로 만들고 함칠 ejs에 넘기고 이런 식으로 했었는데 이제는 합칠 곳에서 이 ejs 파일이 여기에 와야 한다 이렇게 써놓으면 자동으로 view directory에서 .ejs 파일을 찾아서 (?))
app.use(bp.urlencoded({extended:false}));

const module1 = require('./router/module1')(app, fs); // 우리가 만든 모듈을 사용(설정된 app과 fs 모듈을 우리가 만든 module1이라는 곳에 넘겨주고 있는 것(호출하면서))

app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중...');
});
// 3000번 포트로 요청했을 때 module로서 제작해놨기 때문에 /로 get으로 요청했을 때의 미들웨어가 실행됨, 이 때 index.html을 렌더링하라고 되어 있음 -> index.html이 없으니 오류가 남(-> views라는 곳에 파일이 없다고 오류가 남!) -> engine으로 인해 views 디렉토리에서 찾게 됨(그래서 views 폴더에 없으니 오류가 나는 것)