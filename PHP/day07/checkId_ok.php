<?php
    include "./include/dbconn.php"; // DB 연결
    $userid = $_GET['userid'];
    $sql = "select useridx from tb_user where userid='$userid'";
    // 검색했을 때 해당 행이 없다면 null 나올 것임
    
    $result = mysqli_query($conn, $sql);
    $data = mysqli_fecth_array($result); // 결과에서 데이터를 뽑아냄(하나의 테이블 같은 것을 받았을 것임)

    // useridx라는 컬럼이 있는지
    echo isset($data['useridx']) ? "X" : "O";
    // 중복되는 아이디가 있으면 X라는 문자열을 찍을 것이고 없으면 O라는 문자열을 찍을 것임
?>