const e = require("express");

module.exports = (app, fs) => {
    app.get('/', (req, resp) => {
        console.log('module1.js 실행');
        resp.render('./index.html', {
            length: 10
        })
    });
    app.get('/about', (req, resp) => {
        resp.render('./about.html');
    });

    app.get('/list', (req, resp) => {
        // 미들웨어 작성
        // json 파일 읽어서 거기에 있는 것을 띄워줄 것임
        fs.readFile(__dirname + "/../data/member.json", "utf-8", (err, data) => {
            if(err) {
                console.log(err);
            } else {
                console.log(data);
                resp.writeHead(200, {'content-type' : 'text/json; charset=utf-8'});
                resp.end(data);
            }
        }); // __dirname - 현재 실행되고 있는 폴더의 이름
    });

    app.post('/join/:userid', (req, resp) => {
        const result = {};
        const userid = req.params.userid;
        if(!req.body["password"] || !req.body["name"]) {
            result["code"] = 100; // 100 : 실패
            result["msg"] = "매개변수가 전달되지 않음";
            resp.json(result); // 내부에 담긴 객체를 json으로 응답
            return false;
        }
        fs.readFile(__dirname + "/../data/member.json", 'utf-8', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                const members = JSON.parse(data); // JSON을 파싱하는 것(JSON 파일을 해석해서 js에 있는 객체로 만들어줌)(JSON 형태를 해석해서 객체로 돌려줌)
                if(members[userid]) { // 있으면 아이디가 중복된 것
                    result["code"] = 101; // 중복된 아이디
                    result["msg"] = "중복된 아이디";
                    resp.json(result); // 내부에 넘긴 객체를 json으로 응답하는 것
                    return false;
                }
                console.log(req.body);
                members[userid] = req.body; // key값이 넘어온 userid로 body를 넣어 새로운 변수 하나를 만듬(넘어온 것까지 담겨있는 객체)
                fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(members, null, '\t'), 'utf-8', (err, data) => {
                    if(err) {
                        console.log(err);
                    } else {
                        result["code"] = 200;
                        result["msg"] = "성공";
                        resp.json(result);
                    }
                }); // JSON.stringify -> 여기에 넘긴 객체를 json으로 바꿔주는 것!
            }
        });
    });

    // 회원 정보 수정
    app.put("/update/:userid", (req, resp) => { // :userid -> 파라미터 이름이라고 보면 됨(?)
        const result = {};
        const userid = req.params.userid;

        if(!req.body["password"] || !req.body["name"]) {
            result["code"] = 100;
            result["msg"] = "매개변수가 전달되지 않음";
            resp.json(result);
            return false;
        }
        fs.readFile(__dirname + "/../data/member.json", 'utf-8', (err,data) => {
            if(err) {
                console.log(err);
            } else {
                const members = JSON.parse(data);
                if(members[userid]) {
                    members[userid] = req.body;
                    fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(members, null, '\t'), 'utf-8', (err, data) => {
                        if(err) {
                            console.log(err);
                        } else {
                            result["code"] = 200;
                            result["msg"] = "성공";
                            resp.json(result);
                        }
                    });
                }
            }
        });
    });

    // delete 요청
    app.delete("/delete/:userid", (req, resp) => {
        const result = {};
        fs.readFile(__dirname + "/../data/member.json", 'utf-8', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                const members = JSON.parse(data);
                if(!members[req.params.userid]) { // 없는 아이디로 요청을 잘못 보낸 것
                    result["code"] = 102;
                    result["msg"] = "사용자를 찾을 수 없음";
                    resp.json(result);
                    return false;
                }
                delete members[req.params.userid]; // members 객체에서 userid에 해당하는 것이 지워짐
                fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(members, null, '\t'), 'utf-8', (err, data) => {
                    if(err) {
                        console.log(err);
                    } else {
                        result["code"] = 200;
                        result["msg"] = "성공";
                        resp.json(result);
                    }
                });
            }
        });
    });  
} // 날아온 module을 사용하기 위해 배포해줘야 함(사용할 수 있도록 만들어줘야 함)
// app, fs를 받아와서 (?) 호출하는 것이 이 module의 역할