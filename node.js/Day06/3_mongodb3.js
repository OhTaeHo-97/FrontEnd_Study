const express = require('express');
const bp = require('body-parser');
const { JSONCookie } = require('cookie-parser');
const mc = require('mongodb').MongoClient;
const fs = require('fs');

const app = express();
const router = express.Router();

app.use(bp.urlencoded({extended:false}));
let db;

router.route('/member/regist').post((req, resp) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const gender = req.body.gender;

    if(db) {
        // db 관련 코드를 함수로 따로 분리
        // 데이터 받아온 것을 꺼내서 집어넣는 코드를 여기에 작성 -> 흐름을 나눠주고 로직을 작성하는 쪽
        // 여기서 db에 관련된 코드들은 활용되는 코드이지 로직에 관련된 코드는 아님
        // ex. 똑같은 아이디가 있는지, 있느냐에 따라 있으면 x, 없으면 o 그리기는 로직, 그런데 똑같은 아이디 있는지 검색은 활용되는 코드
        // db 검색,추가,삭제,변경 등은 핵심로직이 아니고 핵심로직 구현하기 위한 도구(db와의 연결을 위한 도구)
        // 핵심 로직이 아닌 부분들은 다 분리(핵심로직을 위한 도구들이라면 따로 분리해놓기)
        joinMember(userid, userpw, name, gender, (err, result) => {
            if(err) {
                resp.writeHead(200, {'content-type' : 'text/html;'});
                resp.write('<h2>회원가입 실패</h2>');
                resp.write('<p>오류가 발생했습니다.</p>');
                resp.end();
            } else {
                if(result.insertedCount > 0) {
                    // insert한 개수가 0보다 많으니 성공적으로 추가해준 것
                    resp.writeHead(200, {'content-type' : 'text/html;'});
                    resp.write('<h2>회원가입 성공</h2>');
                    resp.write('<p>가입이 성공적으로 완료되었습니다.</p>');
                    resp.end();
                } else {
                    // 아무것도 넣지 않은 것으로 성공했다는 것
                    resp.writeHead(200, {'content-type' : 'text/html;'});
                    resp.write('<h2>회원가입 실패</h2>');
                    resp.write('<p>오류가 발생했습니다.</p>');
                    resp.end();
                }
            }
        }); // 콜백함수도 넘겨줌(데이터 삽입 성공 또는 실패에 따라 실패했으면 if(err){} 부분 호출해서 사용하고, 성공했다면 else{} 부분 호출해서 사용하도록 넘겨주는 것)(DB 처리 후 호출할 콜백함수를 넘겨줌)
        // db.collection('member').insertMany([], (err, result));
    } else {
        resp.writeHead(200, {'content-type' : 'text/html;'});
        resp.write('<h2>데이터베이스 연결 실패</h2>');
        resp.write('<p>mongodb 데이터베이스 연결 실패</p>');
        resp.end();
    }
});

router.route('/member/login').post((req, resp) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    if(db) {
        loginMember(userid, userpw, (err, result) => {
            if(err) {
                resp.writeHead(200, {'content-type' : "text/html"});
                resp.write('<h2>로그인 실패</h2>');
                resp.write('<p>오류가 발생했습니다.</p>');
                resp.end();
            } else {
                if(result) {
                    resp.writeHead(200, {'content-type' : "text/html"});
                    resp.write('<h2>로그인 성공</h2>');
                    const session = result[0];
                    resp.write(`<p>아이디 : ${session.userid}</p>`);
                    resp.write(`<p>비밀번호 : ${session.userpw}</p>`);
                    resp.write(`<p>이름 : ${session.name}</p>`);
                    resp.write(`<p>성별 : ${session.gender}</p>`);
                    resp.end();
                } else {
                    // 사용자 검색했는데 사용자가 없는 것
                    resp.writeHead(200, {'content-type' : "text/html"});
                    resp.write('<h2>로그인 실패</h2>');
                    resp.write('<p>아이디 또는 비밀번호를 확인하세요</p>');
                    resp.end();
                }
            }
        });
    }
});

// 수정
router.route('/member/edit').put((req, resp) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const gender = req.body.gender;

    if(db) {
        editMember(userid, userpw, name, gender, (err, result) => {
            if(err) {
                resp.writeHead(200, {'content-type' : 'text/html;'});
                resp.write('<h2>회원정보 수정 실패</h2>');
                resp.write('<p>오류가 발생했습니다.</p>');
                resp.end();
            } else {
                if(result.modifiedCount > 0) {
                    resp.writeHead(200, {'content-type' : 'text/html;'});
                    resp.write('<h2>회원정보 수정 성공</h2>');
                    resp.write('<p>정보 수정을 성공하였습니다.</p>');
                    resp.end();
                } else {
                    resp.writeHead(200, {'content-type' : 'text/html;'});
                    resp.write('<h2>회원정보 수정 실패</h2>');
                    resp.write('<p>존재하지 않는 아이디입니다.</p>');
                    resp.end();
                }
            }
        });
    }
});

// 탈퇴
router.route('/member/delete').delete((req, resp) => {
    const userid = req.body.userid;
    if(db) {
        deleteMember(userid, (err, result) => {
            if(err) {
                resp.writeHead(200, {'content-type' : 'text/html'});
                resp.write('<h2>회원정보 삭제 실패</h2>');
                resp.write('<p>오류가 발생했습니다.</p>');
                resp.end();
            } else {
                if(result.deletedCount > 0) {
                    resp.writeHead(200, {'content-type' : 'text/html'});
                    resp.write('<h2>회원정보 삭제 성공</h2>');
                    resp.write('<p>회원 탈퇴 성공...</p>');
                    resp.end();
                } else {
                    resp.writeHead(200, {'content-type' : 'text/html'});
                    resp.write('<h2>회원정보 삭제 실패</h2>');
                    resp.write('<p>존재하지 않는 사용자입니다.</p>');
                    resp.end();
                }
            }
        });
    }
});

router.route('/member/deleteView').get((req, resp) => {
    fs.readFile('./4_leaveId.html', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            resp.writeHead(200, {'content-type':'text/html'});
            resp.end(data);
        }
    });
});

router.route('/member/deleteJSON').delete((req, resp) => {
    console.log(req.body);
    // const userid = resp.json(req.body.userid);
    if(db) {
        deleteMember(userid, (err, result) => {
            if(err) {
                resp.writeHead(200, {'content-type' : 'text/html'});
                resp.write('<h2>회원정보 삭제 실패</h2>');
                resp.write('<p>오류가 발생했습니다.</p>');
                resp.end();
            } else {
                if(result.deletedCount > 0) {
                    resp.writeHead(200, {'content-type' : 'text/html'});
                    resp.write('<h2>회원정보 삭제 성공</h2>');
                    resp.write('<p>회원 탈퇴 성공...</p>');
                    resp.end();
                } else {
                    resp.writeHead(200, {'content-type' : 'text/html'});
                    resp.write('<h2>회원정보 삭제 실패</h2>');
                    resp.write('<p>존재하지 않는 사용자입니다.</p>');
                    resp.end();
                }
            }
        });
    }
});

app.use("/", router);

app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중...');
    dbConn();
}); // 서버 켜질 때 등록해야 하는 것들이 많이 있고 이를 코드로 다 작성하는데 db 연결 코드까지 쓰면 너무 길음 -> db 연결하는 함수를 따로 만듬

function dbConn() {
    const url = 'mongodb://127.0.0.1:27017';
    mc.connect(url, {useUnifiedTopology:true}, (err, conn) => {
        if(err) {
            console.log(`DB연결 실패: ${err}`);
        } else {
            db = conn.db('frontend');
            console.log('DB연결 성공');
        }
    });
}

const joinMember = function(userid, userpw, name, gender, callback) {
    members = db.collection('member');
    // 넘겨준 데이터로 객체 만들어서 mongodb에 삽입
    members.insertMany([{userid: userid, userpw: userpw, name: name, gender: gender}], (err,result) => {
        // 이 함수는 mongodb 모듈이 데이터 처리 후 호출할 함수
        // 실패했다면
        if(err) {
            console.log(err);
            callback(err, null); // --> 넘겨준 콜백함수가 호출됨
            return;
        } else {
            if(result.insertedCount > 0) {
                console.log(`사용자 document ${result.insertedCount}명이 추가되었습니다.`);
            } else {
                console.log('사용자 document가 추가되지 않았습니다.');
            }
            callback(null, result);
        }
    });
}

const loginMember = function(userid, userpw, callback) {
    const members = db.collection('member');
    members.find({userid: userid, userpw: userpw}).toArray((err, result) => {
        if(err) {
            console.log(err);
            callback(err, null);
            return;
        } else {
            if(result.length > 0) {
                console.log('일치하는 사용자가 있습니다.');
                callback(null ,result);
            } else {
                console.log('일치하는 사용자가 없습니다.');
                callback(null, null);
            }
        }
    });
}

const editMember = function(userid, userpw, name, gender, callback) {
    const members = db.collection('member');
    members.updateOne({userid:userid}, {$set:{userid: userid, userpw:userpw, name: name, gender: gender}}, (err, result) => {
        if(err) {
            console.log(err);
            callback(err, null);
            return;
        } else {
            if(result.modifiedCount > 0) {
                console.log(`사용자 document ${result.modifiedCount}명 수정되었습니다.`);
            } else {
                // 찾아봤는데 조건에 해당하는 객체가 없다는 것
                console.log('수정된 document가 없습니다.');
            }
            callback(null, result);
        }
    });
}

const deleteMember = function(userid, callback) {
    const members = db.collection('member');
    members.deleteOne({userid:userid}, (err, result) => {
        if(err) {
            console.log(err);
            callback(err, null);
            return;
        } else {
            if(result.deletedCount > 0) {
                console.log(`사용자 document ${result.deletedCount}명 삭제되었습니다.`);
            } else {
                console.log('삭제된 사용자가 없습니다.');
            }
            callback(null, result);
        }
    });
}