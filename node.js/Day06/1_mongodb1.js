// mongodb 연결해서 요청을 보낼 client 객체
const client = require('mongodb').MongoClient; // 연결했다는 말은 db가 어느 쪽에서 쿼리문 요청하면 그것에 맞는 데이터를 돌려주는 식, client가 요청으로 db에 연결함

// connect(url, 설정객체, 함수)
// url -> 다른 컴퓨터에 설치되어 있는 mongodb에 연결하고 싶다면 (mongodb://ip주소:port번호/데이터베이스) 이용
client.connect('mongodb://127.0.0.1:27017', {useUnifiedTopology:true}, (err, conn) => { // conn -> mongodb에 연결되었을 때, 연결된 다리가 들어있음
    if(err) {
        console.log('데이터베이스 연결 실패!');
        console.log(err);
    } else {
        console.log('데이터베이스 연결 성공!');
        console.log(`connected:${conn}`);

        // 연결된 곳에서 db 하나를 꺼내옴(이름은 frontend)
        const db = conn.db('frontend'); // 그 다리를 통해서 mongodb 안에 frontend라는 db를 꺼내서 db에 넣어주는 것(db가 frontend라는 db에 연결되어있는 객체다)
        const members = db.collection('member'); // member라는 컬렉션을 꺼내옴(mongodb에서 db.member와 같은 것)
        // const temp = members.find({userid:'banana'}); // 하나의 데이터가 됨(프로그래밍적 정보)
        // console.log(temp);
        members.find({userid:'banana'}).toArray((err, result) => {
            if(err) { // 검색 실패
                console.log('알 수 없는 이유로 검색 실패...');
            } else {
                if(result.length > 0) { // 데이터가 있다는 것
                    console.log(`데이터가 존재합니다.`);
                    console.log(result);
                    const banana = result[0];
                    console.log(`아이디 : ${banana.userid}`); // userid 출력
                    console.log(`이름 : ${banana.name}`);
                    console.log(`성별 : ${banana.gender}`);
                } else { // 검색은 됐는데 데이터가 없다는 것
                    console.log('데이터가 존재하지 않습니다.');
                }
            }
        }); // toArray -> 검색된 정보를 배열로 바꿔서 안에 넘겨주는 함수를 호출해줌
    }
}); // 27017: mongodb 대표 포트 번호, useUnifiedTopology -> 통합모드(mongodb에서 이를 갖고 mongodb에 있는 것들을 다 이용할 것이라는 것), 뒤에 콜백함수를 넘겨줌(실패했으면 err에 객체가 담기고 성공했으면 우리가 이용할 수 있는 db 객체가 conn에 담기게 됨)