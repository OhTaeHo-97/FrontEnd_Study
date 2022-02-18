<?php
    session_start();
    include "./include/dbconn.php";
    $userid = $_POST['userid'];//apple
    $userpw = $_POST['userpw'];//111111

    //DB검색
    $sql = "select useridx,userid,username from tb_user where userid='$userid' and userpw=md5('$userpw')";
    $result = mysqli_query($conn,$sql);
    $data = mysqli_fetch_array($result);

    //검색된 결과가 있니?있으면 $userid:없으면 '';
    $flag = isset($data['userid'])?$userid:'';

    if($flag != ''){
        $_SESSION['userid'] = $userid;
        $_SESSION['useridx'] = $data['useridx'];
        $_SESSION['username'] = $data['username'];
        echo "<script>alert('로그인 성공!'); location.href='./login.php';</script>";
    }
    else{
        echo "<script>alert('로그인 실패! 아이디 비밀번호를 확인하세요');";
        echo "history.back(); </script>";
    }
?>