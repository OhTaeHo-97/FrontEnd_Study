const express = require('express');
const bp = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { MongoDBNamespace } = require('mongoose/node_modules/mongodb');
const { response } = require('express');

const app = express();
const router = express.Router();

let db;
let UserSchema;
let UserModel;

app.use(bp.urlencoded({extended:false}));
app.use(logger('dev')); // 로그 등록

router.route('/regist').post((req, resp) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const age = req.body.age;
    const mbti = req.body.mbti;

    if(db) { // db가 연결되어있다면
        joinUser(userid, userpw, name, age, mbti, (err, result) => {
            if(err) {
                resp.writeHead(200, {'content-type' : 'text/html;charset=utf-8'});
                resp.write('<h2>회원가입 실패</h2>');
                resp.write('<p>' + err + '</p>');
                resp.end();
            } else {
                if(result) {
                    resp.writeHead(200, {'content-type':'text/html;charset=utf-8'});
                    resp.write('<h2>회원가입 성공</h2>');
                    resp.end();
                } else {
                    resp.writeHead(200, {'content-type' : 'text/html;charset=utf-8'});
                    resp.write('<h2>회원가입 실패</h2>');
                    resp.end();
                }
            }
        });
    } else {
        resp.writeHead(200, {'content-type':'text/html;charset=utf-8'});
        resp.write('DB 연결 실패');
        resp.end();
    }
});

router.route('/login').post((req, resp) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    if(db) {
        loginUser(userid, userpw, (err, result) => {
            if(err) {
                resp.writeHead(200, {'content-type' : 'text/html;charset=utf-8'});
                resp.write('<h2>로그인 실패</h2>');
                resp.write('<p>' + err + '</p>');
                resp.end();
            } else {
                if(result) {
                    const name = result[0].name;
                    const age = result[0].age;
                    const mbti = result[0].mbti;

                    resp.writeHead(200, {'content-type' : 'text/html;charset=utf-8'});
                    resp.write('<h2>로그인 실패</h2>');
                    resp.write(`<p>아이디: ${userid}</p>`);
                    resp.write(`<p>비밀번호: ${userpw}</p>`);
                    resp.write(`<p>이름: ${name}</p>`);
                    resp.write(`<p>나이: ${age}</p>`);
                    resp.write(`<p>MBTI: ${mbti}</p>`);
                    resp.end();
                } else {
                    resp.writeHead(200, {'content-type' : 'text/html;charset=utf-8'});
                    resp.write('<h2>로그인 실패</h2>');
                    resp.write('<p>' + err + '</p>');
                    resp.end();
                }
            }
        });
    }
});

router.route('/list').get((req, resp) => {
    if(db) {
        UserModel.findAll((err, result) => { // (?)
            if(err) {
                console.log('리스트 조회 실패');
            } else {
                if(result) {
                    resp.writeHead(200, {'content-type':'text/html;charset=utf-8'});
                    resp.write('<h2>회원 리스트</h2>');
                    resp.write('<div><ul>');
                    for(let i = 0; i < result.length; i++) {
                        let user = result[i];
                        resp.write(`<li><p>아이디: ${user.userid}</p>`);
                        resp.write(`<p>비밀번호: ${user.userpw}</p>`);
                        resp.write(`<p>이름: ${user.name}</p>`);
                        resp.write(`<p>나이: ${user.age}</p>`);
                        resp.write(`<p>MBTI: ${user.mbti}</p></li>`);
                    }
                    resp.write('</ul></div>');
                    resp.end();
                } else {
                    // 회원 정보가 없을 때 오는 곳
                }
            }
        });
    }
})

app.use('/', router);
app.listen(3000, () => {
    console.log('3000번 포트로 서버 작동중...');
    connectDB();
});

function joinUser(userid, userpw, name, age, mbti, callback) {
    const user = new UserModel({userid: userid, userpw: userpw, name: name, age: age, mbti: mbti}); // 받은 것으로 객체를 만들고 그것을 model화 시키는 것(model 이용해서 추가하는데 model에 어떤 schema를 참고해야 하는지 어떤 컬렉션인지 적어놨으니 (?))(schema 참고할 모델을 만든 것)(집어넣는 데이터들이 schema를 참조해야 하니 참고할 수 있도록 model로 만들어주는 것)
    // (?)
    user.save((err, result) => {
        if(err) {
            console.log(err);
            callback(err, null);
            return
        } else {
            callback(null, result);
        }
    }); // 추가해주는 것(스키마를 참고해서)((?) user 컬렉션 찾아서 추가하는 작업 할 것임)
}

function loginUser(userid, userpw, callback) {
    UserModel.find({userid:userid, userpw:userpw}, (err, result) => {
        if(err) {
            console.log(err);
            callback(err, null);
            return;
        } else {
            if(result.length > 0) {
                console.log('일치하는 사용자가 있음');
                callback(null, result);
            } else {
                console.log('일치하는 사용자가 없음');
                callback(null, null);
            }
        }
    }) // 앞에는 조건, 뒤에는 수행할 함수
}

// mongoose로 DB 연결
function connectDB() {
    const uri = "mongodb://127.0.0.1:27017/frontend";
    // 전체 웹 사이트에서 DB 처리를 동기화로 설정
    mongoose.Promise = global.Promise; // 웹사이트 전체에서 mongoose가 처리할 DB 처리를 동기화로 만들어주는 설정
    // DB 처리 -> 비동기식으로 처리되면 문제가 될 수 있음(어디선가 insert하고 있었는데 여기서는 검색하고 있으면 동시에 처리가 되면 문제가 생길 수 있음)(즉, 순서대로 진행이 되어야 함)
    mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:false}); // useNewUrlParser 안 넣으면 충돌남(새로운 URL parser를 사용하는지 안하는지), useUnifiedTopology -> 통합모드
    db = mongoose.connection;

    db.on("error", console.error.bind(console, 'mongoose 연결 실패!')); // error라는 이벤트가 발생했다면 에러를 찍는 코드
    db.on("open", () => {
        console.log('데이터베이스 연결 성공!');
        // s자를 자동으로 붙이지 않도록 설정
        mongoose.pluralize(null);

        // 스키마 정의
        UserSchema = mongoose.Schema({
            userid:String,
            userpw:String,
            name:String,
            age:Number,
            mbti:String
        }, {
            collection: 'user'
        })
        
        // 검색이라고 하는데 나는 전체 회원을 검색하고 싶음, 이를 자주 씀 -> 특정 DB 코드를 자주 쓰게 되거나 할 때 그것을 따로 메서드로 만들어놓으면 편함
        UserSchema.static('findAll', function(callback) {
            return this.find({}, callback);
        }); // find를 조건 없이 만드는 것으로 만들어졌음
        console.log('UserSchema 생성 완료!');

        UserModel = mongoose.model('user', UserSchema); // 데이터와 대응된 채 DB 처리를 쉽게 할 수 있도록 interface를 만들어주는, 그 interface를 model이라고 함
        // 위에서 정해놓은 schema대로 추가, 수정, 삭제, 검색을 해야 하는데 그러기 위해서 필요한 대상이 model
        // 어떤 메서드를 쓰고 할 때 model이라는 것을 이용해서 씀(model 이용해서 찾아오고 추가하고 이런 식)(DAO와 비슷한 느낌)
        // 그냥 user라고 적으면 user라는 컬렉션을 찾는 것이 아닌 users를 찾음(user라는 컬렉션명을 쓰고 싶으면 미리 정해줘야 함! -> mongoose 연결할 때 mongoose.pluralize(), 스키마 정의 시 {collection: '스키마명'} 이용)
    }); // 정상적으로 연결됐다면
}