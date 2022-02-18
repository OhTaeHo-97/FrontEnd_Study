<?php
    session_start();
    $userid = $_POST['userid'];
    $userpw = $_POST['userpw'];

    // DB 검색
    if($userid == 'admin' && $userpw = '1234') {
        $_SESSION['userid'] = $userid;
        echo "<script>alert('로그인 성공!'); location.href = './9_login.php';</script>";
    } else {
        echo "<script>alert('로그인 실패! 아이디 비밀번호를 확인하세요'); history.back();</script>";
    }
?>