<?php
    $conn = mysqli_connect("127.0.0.1", "root", "0000", "frontend") or die("데이터베이스 연결 실패!"); // 포트 번호가 3306이 아닌 다른 포트라면 frontend라는 DB명 뒤에 포트 번호를 하나 더 써주면 됨
    // 서비스 안에 여러 개의 DB가 있음, 어떤 DB를 쓸지를 알려줘야지만 접속할 수 있음!
    // mysql -> php의 외부 프로그램, mysql이 관리하고 있는 DB 파일도 외부파일
    // 그것을 불러오고 하는 것이 필요함
    // php에서 외부파일에 쓰고 싶으면 중간에 다리(통로)가 필요함
    // connect() -> 다리를 만드는 역할이라고 보면 됨!

    if($conn) {
        echo "DB연결 성공!";
    } else {
        echo("연결 실패");
    }
?>