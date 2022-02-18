<?php
    session_start();
    include "include/dbconn.php";
    $userid = $_POST['userid'];
    $userpw = $_POST['userpw'];

    // DB 검색
    $sql = "select useridx, userid, username from tb_user where userid = '$userid' and userpw = md5('$userpw')";
    $result = mysqli_query($conn, $sql);
    $data = mysqli_fetch_array($result);// 테이블을 배열처럼 받아옴

    $flag = isset($data['userid']) ? $userid : ''; // userid로 검색된 column을 뜻함

    if($flag != '') {
        $_SESSION['userid'] = $userid;
        $_SESSION['useridx'] = $data['useridx'];
        $_SESSION['username'] = $data['username'];
        echo "<script>alert('로그인 성공!'); location.href = '4_main.php';</script>";
    } else {
        echo "<script>alert('로그인 실패! 아이디 비밀번호를 확인하세요'); history.back();</script>";
    }

    // if($userid == 'admin' && $userpw = '1234') {
    //     $_SESSION['userid'] = $userid;
    //     echo "<script>alert('로그인 성공!'); location.href = './9_login.php';</script>";
    // } else {
    //     echo "<script>alert('로그인 실패! 아이디 비밀번호를 확인하세요'); history.back();</script>";
    // }
?>